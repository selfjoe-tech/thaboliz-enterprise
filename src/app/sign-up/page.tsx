import Link from "next/link";
import { signUpAction } from "@/app/(auth)/actions";
import PasswordField from "@/components/auth/password-field";
import SubmitButton from "@/components/auth/submit-button";

type SearchParams = Promise<{
  error?: string;
  notice?: string;
  inviteToken?: string;
}>;

export default async function SignUpPage({
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
            <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
            <p className="mt-2 text-sm text-white/55">
              Set up your company workspace.
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

          <form action={signUpAction} className="space-y-4">
            <input type="hidden" name="inviteToken" value={inviteToken} />

            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-white/85">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="John Doe"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-white/85">
                Company name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="Thaboliz Services"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
              />
            </div>

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
              minLength={8}
              placeholder="Minimum 8 characters"
            />

            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              minLength={8}
              placeholder="Repeat password"
            />

            <SubmitButton idleLabel="Create account" pendingLabel="Creating account..." />
          </form>

          <p className="mt-6 text-sm text-white/55">
            Already have an account?{" "}
            <Link
              href={
                inviteToken
                  ? `/login?inviteToken=${encodeURIComponent(inviteToken)}`
                  : "/login"
              }
              className="text-white underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}