import { z } from "zod";

export const usernameSchema = z.string()
    .min(3, "Username must be at least 3 characters long")
    .superRefine((v, ctx) => {
        if (!/^[a-zA-Z0-9_]+$/.test(v)) {
            ctx.addIssue({
                code: "custom",
                message: "Username can only contain letters, numbers and underscores",
            });
        }
        if (v.startsWith("_")) {
            ctx.addIssue({
                code: "custom",
                message: "Username cannot start with an underscore",
            });
        }
        return true;
    });

export const passwordSchema = z.string().min(8, "Password must be at least 8 characters long")
    .superRefine((v, ctx) => {
        if (!/[a-z]/.test(v)) {
            ctx.addIssue({
                code: "custom",
                message: "Password must contain at least one lowercase letter",
            });
        }
        if (!/[A-Z]/.test(v)) {
            ctx.addIssue({
                code: "custom",
                message: "Password must contain at least one uppercase letter",
            });
        }
        if (!/[0-9]/.test(v)) {
            ctx.addIssue({
                code: "custom",
                message: "Password must contain at least one number",
            });
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v)) {
            ctx.addIssue({
                code: "custom",
                message: "Password must contain at least one special character",
            });
        }
        return true;
    });

export const signupSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
    email: z.string().email(),
});
export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
});
export type LoginSchema = z.infer<typeof loginSchema>;
