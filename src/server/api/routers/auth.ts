import bcrypt from "bcrypt";

import { RateLimiter, createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signupSchema } from "@/validation/auth";
import { TRPCError } from "@trpc/server";
import { UserFilter } from "@/utils/utils";

import { v4 as uuidv4 } from 'uuid';
import mailer from "@/server/mail";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    // .use(RateLimiter({
    //   max: 2,
    //   windowMs: 24 * 60 * 60 * 1000,
    //   message: (remaining) => `Too many signups, please try again in ${remaining}`,
    // }))
    .input(signupSchema)
    .mutation(async ({ ctx, input }) => {
      
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.password, salt);

      // Generate email verification token
      const verificationToken = uuidv4();

      try {
        // Create user
        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: hash,
            username: input.username,
          },
          select: UserFilter
        });

        // Store verification token in redis
        await ctx.redis.set(`verification:${verificationToken}`, JSON.stringify({
          email: input.email,
          username: input.username,
          password: hash,
        }), {
          ex: 60 * 60 * 24,
        });
  
        // Send verification email
        const msg = `Hello ${input.username},\n\nPlease verify your email with this code: ${verificationToken}\n\nBest regards,\nEventMate`;
        const msgHtml = `Hello ${input.username},\n\nPlease <a href="https://eventmate.tech/verify/${verificationToken}">Verify your Email</a>\n\nBest regards,\nEventMate`;
  
        mailer.sendMail({
          from: {
            name: "EventMate",
            address: "info@eventmate.tech"
          },
          to: input.email,
          subject: "Verify your Email",
          text: msg,
          html: msgHtml.replace(/\n/g, "<br>"),
        });

        return user;

      } catch (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username or email already exists",
        });
      }
    }),

  verifyEmail: publicProcedure
    .input(z.object({
      token: z.string(),
    }))
    .query(async ({ ctx, input }) => {

      const verificationToken = await ctx.redis.get<{ email: string, username: string, password: string }>(`verification:${input.token}`);

      if (!verificationToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email is either already verified or the token is invalid",
        });
      }

      await ctx.prisma.user.update({
        where: { email: verificationToken.email },
        data: {
          emailVerified: true,
        },
      });
      await ctx.redis.del(`verification:${input.token}`);

      return verificationToken.email;
    }),
});
