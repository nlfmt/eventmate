import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";
import { searchRouter } from "./routers/search";
import { invitationRouter } from "./routers/invitation";
import { requirementRouter } from "./routers/requirements";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  event: eventRouter,
  user: userRouter,
  search: searchRouter,
  invitation: invitationRouter,
  requirement: requirementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
