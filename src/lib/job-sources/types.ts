export type ExternalJob = {
  external_id: string;

  title: string;
  company: string;

  description?: string | null;

  location?: string | null;

  job_url: string;

  posted_at?: string | null;

  source: string;
};

export interface JobSource {
  name: string;

  fetchJobs(): Promise<ExternalJob[]>;
}