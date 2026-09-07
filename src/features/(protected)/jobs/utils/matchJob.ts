import type { CreateJobInput } from "../schemas/schemas";

type JobPreferences = {
  categories: string[];
  keywords: string[];
  work_modes: string[];
  locations: string[];
  max_experience_years: number | null;
  include_internships: boolean;
  include_entry_level: boolean;
};

export type JobMatchResult = {
  score: number;
  reasons: string[];
};

export function matchJobToPreferences(
  job: CreateJobInput,
  preferences: JobPreferences,
): JobMatchResult {
  let score = 0;
  const reasons: string[] = [];

  // Category — 30 points
  if (preferences.categories.includes(job.category ?? "")) {
    score += 30;
    reasons.push(`Matches your ${job.category} job preference`);
  }

  // Keywords — up to 25 points
  const preferredKeywords = preferences.keywords.map((keyword) =>
    keyword.toLowerCase(),
  );

  const jobKeywords = (job.matched_keywords ?? []).map((keyword) =>
    keyword.toLowerCase(),
  );

  const matchingKeywords = preferredKeywords.filter((keyword) =>
    jobKeywords.includes(keyword),
  );

  if (matchingKeywords.length > 0) {
    score += Math.min(matchingKeywords.length * 10, 25);

    reasons.push(
      `Matches your keywords: ${matchingKeywords.join(", ")}`,
    );
  }

  // Work mode — 20 points
  if (
    job.work_mode &&
    preferences.work_modes.includes(job.work_mode)
  ) {
    score += 20;

    reasons.push(
      `Matches your preferred work mode: ${job.work_mode}`,
    );
  }

  // Location — 10 points
  const preferredLocations = preferences.locations.map((location) =>
    location.toLowerCase(),
  );

  const jobLocation = job.location?.toLowerCase() ?? "";

  const matchingLocation = preferredLocations.find((location) =>
    jobLocation.includes(location),
  );

  if (matchingLocation) {
    score += 10;

    reasons.push(
      `Matches your preferred location: ${matchingLocation}`,
    );
  }

  // Experience preference — 15 points
  if (
    job.experience_level === "internship" &&
    preferences.include_internships
  ) {
    score += 15;
    reasons.push("Internship matches your preferences");
  } else if (
    job.experience_level === "entry" &&
    preferences.include_entry_level
  ) {
    score += 15;
    reasons.push("Entry-level job matches your preferences");
  }

  return {
    score: Math.min(score, 100),
    reasons,
  };
}