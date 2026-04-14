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

function withNotice(path: string, message: string) {
  return `${path}?notice=${encodeURIComponent(message)}`;
}

export async function signUpAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const inviteToken = String(formData.get("inviteToken") ?? "").trim();

  if (!fullName || !companyName || !email || !password || !confirmPassword) {
    redirect(withError("/sign-up", "Please complete all required fields."));
  }

  if (password.length < 8) {
    redirect(withError("/sign-up", "Password must be at least 8 characters."));
  }

  if (password !== confirmPassword) {
    redirect(withError("/sign-up", "Passwords do not match."));
  }

  const companySlug = slugify(companyName);

  if (!companySlug) {
    redirect(withError("/sign-up", "Please provide a valid company name."));
  }

  const supabase = await createClient();

  const { data: existingTenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", companySlug)
    .maybeSingle();

  if (existingTenant) {
    redirect(withError("/sign-up", "That company name is already in use. Use a different one."));
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

  const { data: realAuthUser, error: realAuthUserError } =
    await adminSupabase.auth.admin.getUserById(data.user.id);

  if (realAuthUserError || !realAuthUser?.user) {
    redirect(
      withNotice(
        "/login",
        "That email may already be registered. Try logging in instead, or use a different email address.",
      ),
    );
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

  const verifyUrl = inviteToken
    ? `/verify-sign-up?email=${encodeURIComponent(email)}&inviteToken=${encodeURIComponent(inviteToken)}`
    : `/verify-sign-up?email=${encodeURIComponent(email)}`;

  redirect(verifyUrl);
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const inviteToken = String(formData.get("inviteToken") ?? "").trim();

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

  if (inviteToken) {
    redirect(`/auth/finish-login?inviteToken=${encodeURIComponent(inviteToken)}`);
  }

  redirect("/admin/products");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}