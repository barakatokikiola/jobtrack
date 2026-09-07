import { createClient } from "@/lib/supabase/client";
import { matchJobToPreferences } from "../utils/matchJob";
import type { CreateJobInput } from "../schemas/schemas";

export async function getMatchedJobs(userId: string) {
  const supabase = createClient();

  // Get the user's preferences
  const { data: preferences, error: preferencesError } = await supabase
    .from("job_preferences")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (preferencesError) {
    throw new Error(
      `Failed to fetch job preferences: ${preferencesError.message}`,
    );
  }

  // No preferences means there are no personalized matches yet
  if (!preferences) {
    return [];
  }

  // Get active jobs
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true);

  if (jobsError) {
    throw new Error(
      `Failed to fetch jobs: ${jobsError.message}`,
    );
  }

  // Calculate a personalized score for every job
  const matchedJobs = (jobs as CreateJobInput[]).map((job) => {
    const match = matchJobToPreferences(job, preferences);

    return {
      ...job,
      match_score: match.score,
      match_reasons: match.reasons,
    };
  });

  // Highest matches first
  matchedJobs.sort((a, b) => b.match_score - a.match_score);

  return matchedJobs;
}