import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const requirementRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.requirement.findMany({
        where: { eventId: input.eventId },
        include: {
          fulfillments: {
            select: { id: true, quantity: true, user: { select: { username: true } } },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      eventId: z.string(),
      description: z.string(),
      count: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {

      const event = await ctx.prisma.event.findUnique({
        where: { id: input.eventId },
      });

      if (!event) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }

      if (event.authorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to create requirements for this event",
        });
      }

      return await ctx.prisma.requirement.create({
        data: {
          description: input.description,
          count: input.count,
          event: { connect: { id: input.eventId } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ requirementId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // delete requirement and all connected fulfillments
      return await ctx.prisma.requirement.delete({
        where: { id: input.requirementId },
        include: { fulfillments: true },
      });
    }),
    
  addFulfillment: protectedProcedure
    .input(z.object({
      requirementId: z.string(),
      quantity: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {

      // check if user is in the event, if the requirement is already fulfilled, if the quantity provide would be too much
      const requirement = await ctx.prisma.requirement.findUnique({
        where: { id: input.requirementId },
        include: { event: { select: { participants: true } }, fulfillments: true },
      });

      if (!requirement) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Requirement not found" });
      }

      if (!requirement.event.participants.some((user) => user.id === ctx.session.user.id)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to fulfill this requirement",
        });
      }

      const alreadyFulfilled = requirement.fulfillments.reduce((acc, fulfillment) => {
        return acc + fulfillment.quantity;
      }, 0);

      if (alreadyFulfilled + input.quantity > requirement.count) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are trying to fulfill more than the requirement",
        });
      }

      // check if user has already fulfilled this requirement, then update fulfillment
      const existingFulfillment = requirement.fulfillments.find((fulfillment) => {
        return fulfillment.userId === ctx.session.user.id;
      });

      if (existingFulfillment) {
        return await ctx.prisma.requirementFulfillment.update({
          where: { id: existingFulfillment.id },
          data: { quantity: existingFulfillment.quantity + input.quantity },
        });

      } else {
        return await ctx.prisma.requirementFulfillment.create({
          data: {
            quantity: input.quantity,
            user: { connect: { id: ctx.session.user.id } },
            requirement: { connect: { id: input.requirementId } },
          },
        });
      }
    }),

  removeFulfillment: protectedProcedure
    .input(z.object({ fulfillmentId: z.string() }))
    .mutation(async ({ ctx, input }) => {

      // check if user is author of the fulfillment or is the event author
      const fulfillment = await ctx.prisma.requirementFulfillment.findUnique({
        where: { id: input.fulfillmentId },
        include: { requirement: { select: { event: { select: { authorId: true } } } } },
      });

      if (!fulfillment) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Fulfillment not found" });
      }

      if (
        fulfillment.requirement.event.authorId !== ctx.session.user.id
        && fulfillment.userId !== ctx.session.user.id
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to remove this fulfillment",
        });
      }

      // delete fulfillment
      return await ctx.prisma.requirementFulfillment.delete({
        where: { id: input.fulfillmentId },
      });
    }),

});
