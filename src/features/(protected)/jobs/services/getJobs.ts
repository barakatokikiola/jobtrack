import { createClient } from "@/lib/supabase/server"


export async function getJobs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("posted_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}