
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const invitationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ eventId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {

      const event = await ctx.prisma.event.findUnique({
        where: { id: input.eventId },
        include: { participants: { select: { id: true } } },
      });
      if (!event) throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event not found",
      });
      
      if (event.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Only the author of the event can invite participants",
        });
      }
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
        select: { id: true }
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      if (event.participants.some((p) => p.id === user.id)) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User is already participating in this event",
        });
      }
      await ctx.prisma.event.update({
        where: { id: input.eventId },
        data: {
          invitations: {
            connect: { id: input.userId },
          },
        },
      });
    }),

    deny: protectedProcedure
      .input(z.object({ eventId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const event = await ctx.prisma.event.findUnique({
          where: { id: input.eventId },
          include: { participants: true },
        });
        if (!event) throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
        
        await ctx.prisma.event.update({
          where: { id: input.eventId },
          data: {
            invitations: {
              disconnect: { id: ctx.session.user.id },
            },
          },
        });
      }),
});