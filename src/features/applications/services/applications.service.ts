import { createClient } from "@/lib/supabase/client";
import { Application } from "../types/application.types";
import { ApplicationFormData } from "../schemas/application.schema";

export async function getApplications(): Promise<Application[]> {
  const supabase =  createClient();

  const {data, error} = await supabase
  .from('applications')
  .select('*')
  .order('created_at', {ascending: false})


  if (error) {
    throw new Error(error.message)
  }
 console.log('data', data)
  return data as Application[]
  
}


export async function createApplication(
  data: ApplicationFormData,
  userId: string
): Promise<Application> {
  const supabase = createClient();

  const { data: application, error } = await supabase
    .from("applications")
    .insert({
      ...data,
      user_id: userId,
      applied_at: data.applied_at || null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return application as Application;
}


export async function getApplicationById(
  id: string
): Promise<Application> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Application;
}


export async function updateApplication(
  id: string,
  data: ApplicationFormData,
): Promise<Application> {
  const supabase = createClient();

  const { data: application, error } = await supabase
    .from("applications")
    .update({
      ...data,
      applied_at: data.applied_at || null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return application as Application;
}

export async function deleteApplication(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}