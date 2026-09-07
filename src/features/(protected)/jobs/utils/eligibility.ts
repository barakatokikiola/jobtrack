import type { CreateJobInput } from "../schemas/schemas";

export function determineEligibility(
  job: CreateJobInput
) {
  const text = `
    ${job.location ?? ""}
    ${job.description ?? ""}
  `.toLowerCase();

  if (
    text.includes("lagos") ||
    text.includes("nigeria") ||
    text.includes("africa") ||
    text.includes("worldwide") ||
    text.includes("anywhere")
  ) {
    return "likely_eligible";
  }

  if (job.work_mode === "remote") {
    return "potentially_eligible";
  }

  if (
    text.includes("uk only") ||
    text.includes("united kingdom only") ||
    text.includes("us only") ||
    text.includes("united states only")
  ) {
    return "restricted";
  }

  return "unknown";
}