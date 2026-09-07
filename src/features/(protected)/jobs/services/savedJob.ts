import { createClient } from "@/lib/supabase/server";

export async function saveJob(
  userId: string,
  jobId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_jobs")
    .insert({
      user_id: userId,
      job_id: jobId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}