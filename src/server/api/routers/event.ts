import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


export const eventRouter = createTRPCRouter({
    myEvents: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.event.findMany({
            where: { authorId: ctx.session.user.id },
        });
    }),
    joinedEvents: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.event.findMany({
            where: { participants: { some: { id: ctx.session.user.id } } },
        });
    }),
})