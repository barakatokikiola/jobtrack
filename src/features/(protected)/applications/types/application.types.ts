export type ApplicationStatus =
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected"
  | "Withdrawn";

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Freelance";

export type WorkMode =
  | "Remote"
  | "Hybrid"
  | "On-site";

export interface Application {
  id: string;
  user_id: string;
  company: string;
  position: string;
  location: string | null;
  job_type: JobType;
  work_mode: WorkMode;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  job_url: string | null;
  status: ApplicationStatus;
  applied_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}