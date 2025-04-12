import { z } from "zod";

export const informationFormSchema = z.object({
    firstname: z
        .string()
        .min(2, "Firstname must be at least 2 characters")
        .regex(/^\S*$/, "Firstname cannot contain spaces"),
    
    lastname: z
        .string()
        .min(2, "Lastname must be at least 2 characters")
        .regex(/^\S*$/, "Lastname cannot contain spaces"),
    
    dob: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }), // Ensures valid date format
    
    email: z.string().email("Invalid email address"),
    
    address: z.string().min(5, "Address is required"),
    
    descself: z.string().min(10, "Please provide a description about yourself"),
    
    education: z
        .array(
            z.object({
                degree: z.string().min(2, "Degree is required"),
                institution: z.string().min(2, "Institution is required"),
                startYear: z.string().regex(/^\d{4}$/, "Start year must be a valid 4-digit year"),
                endYear: z.string().regex(/^\d{4}$/, "End year must be a valid 4-digit year"),
            })
        )
        .min(1, "At least one education entry is required"),
    
    experience: z
        .array(
            z.object({
                jobTitle: z.string().min(2, "Job title is required"),
                company: z.string().min(2, "Company is required"),
                startDate: z.string(),
                endDate: z
                    .string()
                    .optional()
                   
            })
        )
        .min(1, "At least one experience entry is required"),
    
    skills: z
        .array(
            z.object({
                skillName: z.string().min(1, "Skill name is required"),
            })
        )
        .min(1, "At least one skill is required"),
    
    websiteurl: z.string().url("Invalid URL format").optional(),
    githuburl: z.string().url("Invalid URL format").optional(),
    linkedinurl: z.string().url("Invalid URL format").optional(),
});
