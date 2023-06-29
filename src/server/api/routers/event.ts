import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const defaultCountSchema = z
  .object({
    count: z.number().optional().default(10),
  })
  .optional()
  .default({ count: 10 });

export const eventRouter = createTRPCRouter({

  // get all events owned by the user
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

  // get all events the user has joined
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

  // get new events that the user is not participating in yet
  newEvents: publicProcedure
    .input(defaultCountSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.event.findMany({
        where: ctx.session ? { participants: { none: { id: ctx.session.user.id } } } : undefined,
        include: { author: true, _count: { select: { participants: true } } },
        take: input.count,
      });
    }),

  // get all participants of an event
  getParticipants: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findMany({
        where: { events: { some: { id: input.eventId } } },
      });
    }),

  // get a single event by id
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
        include: { author: true, _count: { select: { participants: true } }, participants: true, invitations: true },
      });

      if (!event) throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event not found",
      });

      const isParticipant = event.participants.some((user) => user.id === ctx.session?.user.id);
      const isInvited = event.invitations.some((user) => user.id === ctx.session?.user.id);
      const isAuthor = event.authorId === ctx.session?.user.id;


      if (event.private && !isParticipant && !isInvited && !isAuthor) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to view this event",
        });
      }

      return { event, isParticipant, isInvited, isAuthor };
    }),

  // join an event
  join: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {

      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
        include: { author: true, invitations: true, participants: true },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // if the user is invited, remove the invitation and add them to the participants
      if (event.invitations.some((user) => user.id === ctx.session.user.id)) {
        await ctx.prisma.event.update({
          where: { id: input.id },
          data: {
            participants: {
              connect: { id: ctx.session.user.id },
            },
            invitations: {
              disconnect: { id: ctx.session.user.id },
            },
          },
        });

      // only if the event is public, add the user to the participants
      } else if (!event.private && !event.participants.some((user) => user.id === ctx.session.user.id)) {
        await ctx.prisma.event.update({
          where: { id: input.id },
          data: {
            participants: {
              connect: { id: ctx.session.user.id },
            },
          },
        });
      } else {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to join this event",
        });
      }
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      location: z.string(),
      date: z.date(),
      tags: z.string(),
      eventInfo: z.string(),
      numberMin: z.number(),
      numberMax: z.number(),
      contribution: z.string(),
      price: z.string(),
      private: z.boolean(),
      category: z.string(),
    }))
    .mutation(async ({ ctx, input  }) => {
      const event = await ctx.prisma.event.create({
        data: {
          title: input.name,
          category: input.category,
          author: { connect: { id: ctx.session.user.id } },
          // location: input.location,
          // latitude: 0,
          // longitude: 0,
          date: input.date, // TODO: add time?
          // appt: input.appt,
          tags: input.tags,
          description: input.eventInfo,
          capacity: input.numberMax,
          // numberMax: input.numberMax,
          // contribution: input.contribution,
          // price: input.price,
          private: input.private,
        }
    });

    return event;
  }),
});
