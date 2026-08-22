import { createClient } from "@/lib/supabase/client";
import type { LoginFormData, SignupFormData } from "../schemas/auth.schema";

export async function signup(data: SignupFormData) {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return authData;
}


export async function login(data: LoginFormData) {
  const supabase = createClient();

  const { data: authData, error } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  if (error) {
    throw new Error(error.message);
  }

  return authData;
}


export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}