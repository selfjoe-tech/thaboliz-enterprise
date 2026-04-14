import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

type AppAccess = {
  user: {
    id: string;
    email: string;
    name: string | null;
    is_active: boolean;
  };
  roles: string[];
  permissions: string[];
};

async function getUserAccessByEmail(email: string): Promise<AppAccess | null> {
  const normalized = email.trim().toLowerCase();

  const { data: user, error: userError } = await supabaseAdmin
    .from("app_users")
    .select("id, email, name, is_active")
    .ilike("email", normalized)
    .single();

  if (userError || !user) return null;

  const { data: userRoleRows } = await supabaseAdmin
    .from("user_roles")
    .select("role_id")
    .eq("user_id", user.id);

  const roleIds = (userRoleRows ?? []).map((row: any) => row.role_id);

  let roles: string[] = [];
  let permissions: string[] = [];

  if (roleIds.length > 0) {
    const { data: roleRows } = await supabaseAdmin
      .from("roles")
      .select("id, code")
      .in("id", roleIds);

    roles = (roleRows ?? []).map((row: any) => row.code);

    const { data: rolePermissionRows } = await supabaseAdmin
      .from("role_permissions")
      .select("permission_id")
      .in("role_id", roleIds);

    const permissionIds = Array.from(
      new Set((rolePermissionRows ?? []).map((row: any) => row.permission_id))
    );

    if (permissionIds.length > 0) {
      const { data: permissionRows } = await supabaseAdmin
        .from("permissions")
        .select("id, code")
        .in("id", permissionIds);

      permissions = (permissionRows ?? []).map((row: any) => row.code);
    }
  }

  return {
    user,
    roles,
    permissions,
  };
}

async function getCredentialsUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();

  const { data: user, error } = await supabaseAdmin
    .from("app_users")
    .select("id, email, name, password_hash, is_active")
    .ilike("email", normalized)
    .single();

  if (error || !user) return null;
  if (!user.is_active) return null;
  if (!user.password_hash) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const access = await getUserAccessByEmail(user.email);
  if (!access) return null;

  return {
    id: access.user.id,
    email: access.user.email,
    name: access.user.name,
    isActive: access.user.is_active,
    roles: access.roles,
    permissions: access.permissions,
  };
}

async function upsertGoogleUser(params: {
  email: string;
  name?: string | null;
  providerAccountId?: string | null;
}) {
  const normalized = params.email.trim().toLowerCase();

  const { data: existing } = await supabaseAdmin
    .from("app_users")
    .select("id, email, is_active")
    .ilike("email", normalized)
    .maybeSingle();

  if (!existing) {
    const { error: insertError } = await supabaseAdmin
      .from("app_users")
      .insert([
        {
          email: normalized,
          name: params.name ?? null,
          provider: "google",
          provider_account_id: params.providerAccountId ?? null,
          is_active: true,
        },
      ]);

    if (insertError) throw insertError;
  } else {
    if (!existing.is_active) return false;

    const { error: updateError } = await supabaseAdmin
      .from("app_users")
      .update({
        name: params.name ?? null,
        provider: "google",
        provider_account_id: params.providerAccountId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (updateError) throw updateError;
  }

  return true;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
  signIn: "/admin-login",
  error: "/admin-login",
},
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");

        if (!email || !password) return null;

        return await getCredentialsUser(email, password);
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (!user.email) return false;

        const ok = await upsertGoogleUser({
          email: user.email,
          name: user.name,
          providerAccountId: account.providerAccountId,
        });

        return ok;
      }

      return true;
    },

    async jwt({ token, user }) {
      const email = (user?.email ?? token.email ?? "").toString();
      if (!email) return token;

      if (user || !token.permissions || !token.roles) {
        const access = await getUserAccessByEmail(email);
        if (!access) return token;

        token.uid = access.user.id;
        token.email = access.user.email;
        token.name = access.user.name ?? token.name;
        token.isActive = access.user.is_active;
        token.roles = access.roles;
        token.permissions = access.permissions;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.uid ?? "");
        session.user.email = String(token.email ?? "");
        session.user.name = token.name ? String(token.name) : null;
        session.user.isActive = Boolean(token.isActive);
        session.user.roles = Array.isArray(token.roles) ? token.roles.map(String) : [];
        session.user.permissions = Array.isArray(token.permissions)
          ? token.permissions.map(String)
          : [];
      }

      return session;
    },
  },
};