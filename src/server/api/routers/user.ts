import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { UserFilter } from "@/utils/utils";

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
  changePassword: protectedProcedure
    .input(z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      if (input.newPassword !== input.confirmPassword) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Passwords do not match" });
      }
      if (!await bcrypt.compare(input.oldPassword, user.password)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Old password is incorrect" });
      }
      await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          password: await bcrypt.hash(input.newPassword, 10)
        },
      });
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
        },
        select: UserFilter
      });
    }),
});
