/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { type Session } from "next-auth";

import { getServerAuthSession } from "@/server/nextauth";
import { prisma } from "@/server/db";

type CreateContextOptions = {
  session: Session | null;
  req: NextApiRequest;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    req: opts.req,
    prisma,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerAuthSession({ req, res });

  return createInnerTRPCContext({
    session,
    req,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { type NextApiRequest } from "next";
import { createTRPCUpstashLimiter } from "@trpc-limiter/upstash";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { formatDuration } from "@/utils/utils";
dayjs.extend(duration);

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/** Reusable middleware that enforces users are logged in before running the procedure. */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});


// Rate Limiting using Upstash Redis

/**
 * Get the fingerprint of the request (IP address)
 * @param req The request
 * @returns The fingerprint (IP address)
 */
const getFingerprint = (req: NextApiRequest) => {
  const forwarded = req.headers["x-forwarded-for"]
  const ip = forwarded
    ? (typeof forwarded === "string" ? forwarded : forwarded[0])?.split(/, /)[0]
    : req.socket.remoteAddress
  return ip || "127.0.0.1"
}

type HitInfo = { limit: number; remaining: number; reset: number };

/**
 * Rate limiter middleware
 */
export const RateLimiter = (opts?: { windowMs?: number, max?: number, message?: string | ((remaining: string, hitInfo: HitInfo) => string) }) => {

  let msg: string | ((hitInfo: HitInfo) => string) = "Too many requests, please try again later. {{remaining}}";

  if (typeof opts?.message === "string") {
    msg = opts.message;
  } else if (opts && opts.message && typeof opts?.message === "function") {
    const fn = opts.message;
    msg = (hitInfo: HitInfo) => {
      const remaining = formatDuration(hitInfo.reset - Date.now());
      return fn(remaining, hitInfo);
    }
  }
  
  return createTRPCUpstashLimiter({
    root: t,
    fingerprint: (ctx, _input) => getFingerprint(ctx.req),
    windowMs: 60 * 60 * 1000,
    max: 4,
    ...opts,
    message: msg
  });
};

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
