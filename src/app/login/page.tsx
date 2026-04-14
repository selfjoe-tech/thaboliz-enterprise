import Link from "next/link";
import { loginAction } from "@/app/(auth)/actions";
import PasswordField from "@/components/auth/password-field";
import SubmitButton from "@/components/auth/submit-button";

type SearchParams = Promise<{
  error?: string;
  notice?: string;
  inviteToken?: string;
}>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const error = params?.error;
  const notice = params?.notice;
  const inviteToken = params?.inviteToken ?? "";

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
            <p className="mt-2 text-sm text-white/55">
              Access your company dashboard.
            </p>
          </div>

          {error ? (
            <div className="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          {notice ? (
            <div className="mb-4 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {notice}
            </div>
          ) : null}

          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="inviteToken" value={inviteToken} />

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/85">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
              />
            </div>

            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Your password"
            />

            <SubmitButton idleLabel="Log in" pendingLabel="Logging in..." />
          </form>

          <p className="mt-6 text-sm text-white/55">
            New here?{" "}
            <Link
              href={
                inviteToken
                  ? `/sign-up?inviteToken=${encodeURIComponent(inviteToken)}`
                  : "/sign-up"
              }
              className="text-white underline underline-offset-4"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}