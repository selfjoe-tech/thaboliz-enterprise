

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { adminSupabase } from "@/lib/supabase/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function withError(path: string, message: string) {
  return `${path}?error=${encodeURIComponent(message)}`;
}

export async function signUpAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const companySlugInput = String(formData.get("companySlug") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!fullName || !companyName || !email || !password || !confirmPassword) {
    redirect(withError("/sign-up", "Please complete all required fields."));
  }

  if (password.length < 8) {
    redirect(withError("/sign-up", "Password must be at least 8 characters."));
  }

  if (password !== confirmPassword) {
    redirect(withError("/sign-up", "Passwords do not match."));
  }

  const companySlug = slugify(companySlugInput || companyName);

  if (!companySlug) {
    redirect(withError("/sign-up", "Please provide a valid company slug."));
  }

  const supabase = await createClient();

  const { data: existingTenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", companySlug)
    .maybeSingle();

  if (existingTenant) {
    redirect(withError("/sign-up", "That company slug is already taken."));
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect(withError("/sign-up", error.message));
  }

  if (!data.user?.id) {
    redirect(withError("/sign-up", "Could not create account."));
  }

  const { error: pendingError } = await adminSupabase
    .from("pending_tenant_setups")
    .upsert({
      user_id: data.user.id,
      full_name: fullName,
      company_name: companyName,
      company_slug: companySlug,
      support_email: email,
    });

  if (pendingError) {
    redirect(withError("/sign-up", pendingError.message));
  }

  redirect(
    `/verify-sign-up?email=${encodeURIComponent(email)}`
  );
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(withError("/login", "Email and password are required."));
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(withError("/login", error.message));
  }

  redirect("/admin/products");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}