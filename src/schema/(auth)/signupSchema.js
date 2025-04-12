import { z } from "zod"
export const signupSchema = z.object({
    username: z.string().min(2, "Username at least 2 chaeacters").regex(/^\S*$/, "Username cannot contain spaces"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be 6 characters")
})
