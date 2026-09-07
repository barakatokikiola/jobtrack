import { z } from "zod";

export const applicationSchema = z.object({
  company: z
    .string()
    .min(1, "Company name is required"),

  position: z
    .string()
    .min(1, "Job position is required"),

  location: z.string().optional(),

  job_type: z.enum([
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Freelance",
  ]),

  work_mode: z.enum([
    "Remote",
    "Hybrid",
    "On-site",
  ]),

  salary_min: z.coerce
    .number()
    .nonnegative()
    .optional(),

  salary_max: z.coerce
    .number()
    .nonnegative()
    .optional(),

  currency: z.string().default("NGN"),

  job_url: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  status: z.enum([
    "Applied",
    "Interviewing",
    "Offer",
    "Rejected",
    "Withdrawn",
  ]),

applied_at: z.string().optional().or(z.literal("")),

  notes: z.string().optional(),
});

export type ApplicationFormData = z.infer<
  typeof applicationSchema
>;