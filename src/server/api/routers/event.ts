import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
        take: input.count,
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
  newEvents: protectedProcedure
    .input(defaultCountSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.event.findMany({
        where: { participants: { none: { id: ctx.session.user.id } } },
        include: { author: true, _count: { select: { participants: true } } },
        take: input.count,
      });
    }),
  getParticipants: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findMany({
        where: { events: { some: { id: input.eventId } } },
      });
    }),

  search: publicProcedure
    .input(
      z.object({
        category: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
        query: z.string().optional(),
        pageSize: z.number().min(1).optional().default(15),
        page: z.number().min(1).optional().default(1),
      })
    )
    .query(async ({ ctx, input: { category, end, start, query, page, pageSize } }) => {
      console.log("")
      console.log({ category, end, start, query, page, pageSize });
      console.log("")
      console.log({
        category: category ? category : undefined,
        date: (start && end) ? { gte: new Date(start), lte: new Date(end) } : undefined,
        title: query ? { contains: query } : undefined,
      })
      console.log("")
      return await ctx.prisma.event.findMany({
        where: {
          category: category ? category : undefined,
          date: (start && end) ? { gte: new Date(start), lte: new Date(end) } : undefined,
          title: query ? { contains: query } : undefined,
        },
        include: { author: true, _count: { select: { participants: true } } },
        take: pageSize,
        skip: (page - 1) * pageSize,
      });
    }),
});
