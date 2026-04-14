import Link from "next/link";
import { signUpAction } from "@/app/(auth)/actions";
import PasswordField from "@/components/auth/password-field";

type SearchParams = Promise<{
  error?: string;
  notice?: string;
}>;

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const error = params?.error;
  const notice = params?.notice;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <section className="hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_35%),linear-gradient(135deg,#0a0a0a_0%,#111827_55%,#0a0a0a_100%)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-white/45">
              Seller Admin
            </p>
            <h1 className="mt-5 max-w-[12ch] text-5xl font-semibold leading-[1.02]">
              Create your company workspace.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/68">
              The account creator becomes the owner. Products, team access, categories,
              and admin data will belong to that company workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Ownership</p>
              <p className="mt-2 text-lg font-medium">Owner role on sign-up</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/45">Isolation</p>
              <p className="mt-2 text-lg font-medium">Tenant-based data separation</p>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">
                Sign up
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Create admin account</h2>
              <p className="mt-2 text-sm text-white/55">
                This creates the owner account and the company workspace in one step.
              </p>
            </div>

            {error ? (
              <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            {notice ? (
              <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {notice}
              </div>
            ) : null}

            <form action={signUpAction} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm text-white/70">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
                />
              </div>

              <div>
                <label htmlFor="companyName" className="mb-2 block text-sm text-white/70">
                  Company name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  placeholder="Thaboliz Services"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
                />
              </div>

              <div>
                <label htmlFor="companySlug" className="mb-2 block text-sm text-white/70">
                  Company slug
                </label>
                <input
                  id="companySlug"
                  name="companySlug"
                  type="text"
                  required
                  placeholder="thaboliz-services"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
                />
                <p className="mt-2 text-xs text-white/40">
                  Lowercase letters, numbers, and hyphens only.
                </p>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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
</div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:opacity-90"
              >
                Create account
              </button>
            </form>

            <p className="mt-6 text-sm text-white/55">
              Already have an account?{" "}
              <Link href="/login" className="text-white underline underline-offset-4">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}