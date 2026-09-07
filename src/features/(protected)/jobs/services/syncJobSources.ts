import { GreenhouseSource } from "@/lib/job-sources/greenhouse";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { normalizeJob } from "../utils/normalize";
import { classifyJob } from "../utils/scoring";
import { determineEligibility } from "../utils/eligibility";

type JobSource = {
  id: string;
  name: string;
  type: string;
  base_url: string | null;
  is_active: boolean | null;
};

function getGreenhouseBoardToken(baseUrl: string) {
  return baseUrl.replace(/\/+$/, "").split("/").pop()!;
}

export async function syncJobSources() {
  const supabase = createSupabaseAdminClient();

  const { data: sources, error: sourcesError } = await supabase
    .from("job_sources")
    .select("*")
    .eq("is_active", true);

  if (sourcesError) {
    throw new Error(`Failed to fetch job sources: ${sourcesError.message}`);
  }

  const results = [];

  for (const source of sources as JobSource[]) {
    try {
      if (!source.base_url) {
        results.push({
          source: source.name,
          success: false,
          error: "Missing base_url",
        });

        continue;
      }

      if (source.type === "greenhouse") {
        const boardToken = getGreenhouseBoardToken(source.base_url);

        const greenhouse = new GreenhouseSource(boardToken, source.name);

        const externalJobs = await greenhouse.fetchJobs();

        let successful = 0;
        let failed = 0;

        for (const externalJob of externalJobs) {
          try {
            const job = normalizeJob(externalJob);

            const classification = classifyJob(job);

            const eligibility = determineEligibility(job);

            const { error } = await supabase.from("jobs").upsert(
              {
                ...job,
                category: classification.category,
                matched_keywords: classification.matchedKeywords,
                match_score: classification.score,
                eligibility,
              },
              {
                onConflict: "source,external_id",
                ignoreDuplicates: false,
              },
            );

            if (error) {
              throw new Error(error.message);
            }

            successful++;
          } catch (error) {
            failed++;

            console.error(`Failed to sync job from ${source.name}:`, error);
          }
        }

        await supabase
          .from("job_sources")
          .update({
            last_checked_at: new Date().toISOString(),
          })
          .eq("id", source.id);

        results.push({
          source: source.name,
          type: source.type,
          fetched: externalJobs.length,
          successful,
          failed,
          success: true,
        });

        continue;
      }

      results.push({
        source: source.name,
        success: false,
        error: `Unsupported source type: ${source.type}`,
      });
    } catch (error) {
      results.push({
        source: source.name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return {
    sources: sources.length,
    results,
  };
}
