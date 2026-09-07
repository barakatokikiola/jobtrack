import type {
  ExternalJob,
  JobSource,
} from "./types";

type GreenhouseJob = {
  id: number;
  title: string;

  location?: {
    name: string;
  };

  absolute_url: string;

  updated_at?: string;

  content?: string;
};

type GreenhouseResponse = {
  jobs: GreenhouseJob[];
};

export class GreenhouseSource implements JobSource {
  name = "greenhouse";

  constructor(
    private readonly boardToken: string,
    private readonly companyName: string
  ) {}

  async fetchJobs(): Promise<ExternalJob[]> {
    const response = await fetch(
      `https://boards-api.greenhouse.io/v1/boards/${this.boardToken}/jobs?content=true`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Greenhouse request failed: ${response.status}`
      );
    }

    const data =
      (await response.json()) as GreenhouseResponse;

    return data.jobs.map((job) => ({
      external_id: String(job.id),

      title: job.title,

      company: this.companyName,

      description: job.content ?? null,

      location: job.location?.name ?? null,

      job_url: job.absolute_url,

      posted_at: job.updated_at ?? null,

      source: this.name,
    }));
  }
}