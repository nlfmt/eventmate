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
        where: {
          participants: { some: { id: ctx.session.user.id } },
          authorId: { not: ctx.session.user.id },
        },
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
        orderBy: z
          .enum(["date", "title", "capacity", "participants"])
          .optional()
          .default("date"),
        order: z.enum(["asc", "desc"]).optional().default("asc"),
      })
    )
    .query(
      async ({
        ctx,
        input: { category, end, start, query, page, pageSize, order, orderBy },
      }) => {
        let _order: "asc" | "desc" | { _count: "asc" | "desc" } = order;
        if (orderBy === "participants") {
          _order = { _count: order };
        } else if (["title", "date"].includes(orderBy)) {
          _order = order === "asc" ? "desc" : "asc";
        }

        const where = {
          category: category ? category : undefined,
          date:
            start && end
              ? { gte: new Date(start), lte: new Date(end) }
              : { gte: new Date() },
          OR: query
            ? [{ title: { contains: query } }, { tags: { contains: query } }]
            : undefined,
        };

        const [events, count] = await Promise.all([
          ctx.prisma.event.findMany({
            where,
            include: {
              author: true,
              _count: { select: { participants: true } },
            },
            take: pageSize,
            skip: (page - 1) * pageSize,
            orderBy: { [orderBy]: _order },
          }),
          ctx.prisma.event.count({ where }),
        ]);

        const pageCount = Math.ceil(count / pageSize);

        return { events, pageCount, count };
      }
    ),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
        include: { author: true, _count: { select: { participants: true } } },
      });

      return event;
    }),
});
