import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const defaultCountSchema = z
  .object({
    count: z.number().optional().default(10),
  })
  .optional()
  .default({ count: 10 });

export const eventRouter = createTRPCRouter({

  myEvents: protectedProcedure
    .input(defaultCountSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.event.findMany({
        // select: { _count: { select: { participants: true } } },
        where: { authorId: ctx.session.user.id },
        include: { author: true, _count: { select: { participants: true } } },
        take: input.count
      });
    }),

  joinedEvents: protectedProcedure
    .input(defaultCountSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.event.findMany({
        where: { participants: { some: { id: ctx.session.user.id } } },
        include: { author: true, _count: { select: { participants: true } } },
        take: input.count,
      });
    }),
  getParticipants: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findMany({
        where: { events: { some: { id: input.eventId} } }
      });
    }),
});
