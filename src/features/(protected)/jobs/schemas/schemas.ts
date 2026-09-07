import { z } from "zod";

export const jobSchema = z.object({
  external_id: z.string().nullable(),

  source: z.string().min(1),

  category: z.string().nullable(),

  matched_keywords: z.array(z.string()).nullable(),

  title: z.string().min(1),

  company: z.string().min(1),

  description: z.string().nullable(),

  location: z.string().nullable(),

  job_type: z.string().nullable(),

  work_mode: z.string().nullable(),

  salary_min: z.number().nullable(),

  salary_max: z.number().nullable(),

  currency: z.string().nullable(),

  job_url: z.string().url(),

  posted_at: z.string().datetime().nullable(),

  experience_level: z.string().nullable(),

  eligibility: z.string().nullable(),

  match_score: z.number().int().min(0).max(100).nullable(),
});

export type CreateJobInput = z.infer<typeof jobSchema>;
