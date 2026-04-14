import Link from "next/link";
import { loginAction } from "@/app/(auth)/actions";
import PasswordField from "@/components/auth/password-field";

type SearchParams = Promise<{
  error?: string;
  notice?: string;
}>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const error = params?.error;
  const notice = params?.notice;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">
              Seller Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Log in</h1>
            <p className="mt-2 text-sm text-white/55">
              Sign in to access your company dashboard and products.
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

          <form action={loginAction} className="space-y-4">
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

            <div>
            <PasswordField
                id="password"
                name="password"
                label="Password"
                placeholder="Your password"
                />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:opacity-90"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-sm text-white/55">
            New here?{" "}
            <Link href="/sign-up" className="text-white underline underline-offset-4">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}