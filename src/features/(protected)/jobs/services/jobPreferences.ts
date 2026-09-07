import { createClient } from "@/lib/supabase/client";

export async function getJobPreferences(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("job_preferences")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch job preferences: ${error.message}`,
    );
  }

  return data;
}

export async function createJobPreferences(
  preferences: Record<string, unknown>,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("job_preferences")
    .insert(preferences)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Failed to create job preferences: ${error.message}`,
    );
  }

  return data;
}

export async function updateJobPreferences(
  userId: string,
  preferences: Record<string, unknown>,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("job_preferences")
    .update({
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Failed to update job preferences: ${error.message}`,
    );
  }

  return data;
}