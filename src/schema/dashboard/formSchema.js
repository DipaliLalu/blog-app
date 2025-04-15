import { z } from "zod";

const imageFileSchema = z
    .any()
    .refine((file) => file instanceof File, {
        message: "File is required",
    });


export const formSchema = z.object({
    title: z.string().min(3, "Title must be at 3 characters"),
    description: z.string().min(6, "description must be at least 6 characters"),
    image: imageFileSchema,
    content: z.string().min(10, 'Content is too short'),
    taglist: z
        .array(z.string().min(1))
        .min(1, "Please enter at least 1 tag"),
})