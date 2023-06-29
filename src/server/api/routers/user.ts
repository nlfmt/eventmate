import { z } from "zod";
import { RateLimiter, createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure
    .input(
      z.object({
        /** Events  the user has joined */
        events: z.boolean().optional(),
        /** Events the user has created */
        myEvents: z.boolean().optional(),
        /** Invitations the user has received */
        invitations: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        include: input,
      });
    }),

  get: publicProcedure
    .use(RateLimiter(
      100,
      5000,
    ))
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
    }),
  changePassword: protectedProcedure
    .input(z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: implement
    }),

  changeAccountInfo: protectedProcedure
    .input(z.object({
      username: z.string(),
      email: z.string(),
      bio: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          username: input.username,
          email: input.email,
          bio: input.bio,
        }
      });
    }),
});
