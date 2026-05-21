"use server";

import { redirect }
from "next/navigation";

import { createClient }
from "@/lib/supabase/server";

export async function signUp(
  email: string,
  password: string
) {
  const supabase =
    await createClient();

  const { error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    return {
      success: false,
      message:
        error.message,
    };
  }

  return {
    success: true,
  };
}

export async function login(
  email: string,
  password: string
) {
  const supabase =
    await createClient();

  const { error } =
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      });

  if (error) {
    return {
      success: false,
      message:
        error.message,
    };
  }

  return {
    success: true,
  };
}

export async function logout() {
  const supabase =
    await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}