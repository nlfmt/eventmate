
import z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { UserFilter } from "@/utils/utils";

export const searchRouter = createTRPCRouter({
  // search for events
  event: publicProcedure
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
        joined: z.boolean().optional().default(false),
        owned: z.boolean().optional().default(false),
        invited: z.boolean().optional().default(false),
      })
    )
    .query(
      async ({
        ctx,
        input: { category, end, start, query, page, pageSize, order, orderBy, owned, joined, invited },
      }) => {

        let _order: "asc" | "desc" | { _count: "asc" | "desc" } = order;
        if (orderBy === "participants") {
          _order = { _count: order };
        } else if (["title", "date"].includes(orderBy)) {
          _order = order === "asc" ? "desc" : "asc";
        }

        const where = {
          category: category ? category : undefined,
          authorId: owned && ctx.session ? ctx.session.user.id : undefined,
          participants: joined && ctx.session ? { some: { id: ctx.session.user.id } } : undefined,
          invitations: invited && ctx.session ? { some: { id: ctx.session.user.id } } : undefined,
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
              author: { select: UserFilter },
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

  // search for users
  user: publicProcedure
    .input(z.object({ query: z.string().optional(), pageSize: z.number().min(1).optional().default(15), page: z.number().min(1).optional().default(1) }))
    .query(async ({ ctx, input: { query, page, pageSize } }) => {
      const [users, count] = await Promise.all([
        ctx.prisma.user.findMany({
          where: query ? { username: { contains: query } } : undefined,
          take: pageSize,
          skip: (page - 1) * pageSize,
        }),
        ctx.prisma.user.count({ where: query ? { username: { contains: query } } : undefined }),
      ]);

      const pageCount = Math.ceil(count / pageSize);

      return { users, pageCount, count };
    }),
});