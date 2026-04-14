import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  roles: string[];
  permissions: string[];
};

type GuardSuccess = {
  ok: true;
  user: SessionUser;
};

type GuardFailure = {
  ok: false;
  response: NextResponse;
};

type GuardResult = GuardSuccess | GuardFailure;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireSignedIn(): Promise<GuardResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      ok: false,
      response: jsonError("Unauthorized", 401),
    };
  }

  if (!session.user.isActive) {
    return {
      ok: false,
      response: jsonError("Account is disabled", 403),
    };
  }

  return {
    ok: true,
    user: session.user,
  };
}

export async function requirePermission(
  required: string | string[]
): Promise<GuardResult> {
  const auth = await requireSignedIn();
  if (!auth.ok) return auth;

  const requiredList = Array.isArray(required) ? required : [required];
  const permissions = auth.user.permissions ?? [];

  const allowed = requiredList.some((permission) =>
    permissions.includes(permission)
  );

  if (!allowed) {
    return {
      ok: false,
      response: jsonError("Forbidden", 403),
    };
  }

  return auth;
}

export async function requireAdminPermission(
  required: string | string[]
): Promise<GuardResult> {
  const auth = await requireSignedIn();
  if (!auth.ok) return auth;

  const permissions = auth.user.permissions ?? [];

  if (!permissions.includes("access_admin")) {
    return {
      ok: false,
      response: jsonError("Forbidden", 403),
    };
  }

  const requiredList = Array.isArray(required) ? required : [required];
  const allowed = requiredList.some((permission) =>
    permissions.includes(permission)
  );

  if (!allowed) {
    return {
      ok: false,
      response: jsonError("Forbidden", 403),
    };
  }

  return auth;
}

export async function requireRole(
  required: string | string[]
): Promise<GuardResult> {
  const auth = await requireSignedIn();
  if (!auth.ok) return auth;

  const requiredList = Array.isArray(required) ? required : [required];
  const roles = auth.user.roles ?? [];

  const allowed = requiredList.some((role) => roles.includes(role));

  if (!allowed) {
    return {
      ok: false,
      response: jsonError("Forbidden", 403),
    };
  }

  return auth;
}