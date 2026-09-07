export type Job = {
  id: string;
  external_id: string | null;
  source: string;

  title: string;
  company: string;

  description: string | null;

  location: string | null;
  job_type: string | null;
  work_mode: string | null;

  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;

  job_url: string;

  posted_at: string | null;
  discovered_at: string;

  experience_level: string | null;

  eligibility: string | null;
  match_score: number | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;
};

export type JobSource = {
  id: string;
  name: string;
  type: string;
  base_url: string | null;
  is_active: boolean;
  last_checked_at: string | null;
  created_at: string;
};

export type SavedJob = {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
};