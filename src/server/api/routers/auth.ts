import bcrypt from "bcrypt";

import { RateLimiter, createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/validation/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    // .use(RateLimiter(
    //   5 * 60 * 1000,
    //   300 * 60 * 1000,
    //   "You can't create new accounts this often."
    // ))
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
