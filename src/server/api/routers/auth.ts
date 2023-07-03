import bcrypt from "bcrypt";

import { RateLimiter, createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/validation/auth";
import { TRPCError } from "@trpc/server";
import { UserFilter } from "@/utils/utils";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .use(RateLimiter({
      max: 2,
      windowMs: 24 * 60 * 60 * 1000,
      message: (remaining) => `Too many signups, please try again in ${remaining}`,
    }))
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.password, salt);

      try {
        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: hash,
            username: input.username,
          },
          select: UserFilter
        });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username or email already exists",
        });
      }
    }),
});
