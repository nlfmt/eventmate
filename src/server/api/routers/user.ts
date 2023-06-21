import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
    }),
});
