import * as z from "zod";

export const signinSchema = z.object({
    username: z
        .string("Not a string.")
        .trim()
        .min(1, "Username is required.")
        .max(21, "Username must be at most 21 characters long.")
        .transform((val) => val.toLowerCase())
        .refine((val) => /^[a-z0-9]+$/.test(val), {
            message: "Username can only contain letters and numbers.",
        }),
    password: z
        .string("Not a string.")
        .min(8, "Password must be at least 8 characters.")
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." }),
});
