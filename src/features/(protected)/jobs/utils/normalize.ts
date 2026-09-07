import he from "he";

import type { ExternalJob } from "@/lib/job-sources/types";
import type { CreateJobInput } from "../schemas/schemas";

function cleanDescription(description?: string | null) {
  if (!description) return null;

  const decoded = he.decode(description);

  return decoded
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function detectWorkMode(location?: string | null, description?: string | null) {
  const text = `${location ?? ""} ${description ?? ""}`.toLowerCase();

  if (text.includes("remote")) {
    return "remote";
  }

  if (text.includes("hybrid")) {
    return "hybrid";
  }

  if (text.includes("on-site") || text.includes("onsite")) {
    return "onsite";
  }

  return null;
}

function detectExperienceLevel(
  title?: string | null,
  description?: string | null,
) {
  const text = `${title ?? ""} ${description ?? ""}`.toLowerCase();

  if (text.includes("intern") || text.includes("internship")) {
    return "internship";
  }

  if (
    text.includes("entry level") ||
    text.includes("entry-level") ||
    text.includes("junior") ||
    text.includes("graduate")
  ) {
    return "entry";
  }

  if (
    text.includes("senior") ||
    text.includes("sr.") ||
    text.includes("lead") ||
    text.includes("principal")
  ) {
    return "senior";
  }

  if (
    text.includes("mid-level") ||
    text.includes("mid level") ||
    text.includes("intermediate")
  ) {
    return "mid";
  }

  return null;
}

export function normalizeJob(job: ExternalJob): CreateJobInput {
  return {
    external_id: job.external_id,

    source: job.source,

    category: null,

    matched_keywords: null,

    title: job.title.trim(),

    company: job.company.trim(),

    description: cleanDescription(job.description),

    location: job.location?.trim() ?? null,

    job_type: null,

    work_mode: detectWorkMode(job.location, job.description),

    salary_min: null,

    salary_max: null,

    currency: null,

    job_url: job.job_url,

    posted_at: job.posted_at ?? null,

    experience_level: detectExperienceLevel(job.title, job.description),

    eligibility: null,

    match_score: null,
  };
}
