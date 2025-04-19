import { z } from "zod";

const imageFileSchema = z
    .string()
    .min(1, "Image is required")
    .refine((val) => val.startsWith("data:image/"), {
        message: "Invalid image format",
    })


export const formSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(3, "Title must be at 3 characters"),
    description: z.string().min(6, "description must be at least 6 characters"),
    image: imageFileSchema,
    content: z.string().min(10, 'Content is too short'),
    taglist: z
        .array(z.string().min(1))
        .min(1, "Please enter at least 1 tag"),
})