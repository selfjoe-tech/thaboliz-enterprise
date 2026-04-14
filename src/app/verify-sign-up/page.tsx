import VerifySignUpForm from "./verify-sign-up-form";

type SearchParams = Promise<{
  email?: string;
  error?: string;
}>;

export default async function VerifySignUpPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const email = params?.email ?? "";
  const error = params?.error;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-white/45">
              Verify account
            </p>
            <h1 className="mt-3 text-3xl font-semibold">Enter your code</h1>
            <p className="mt-2 text-sm text-white/55">
              We sent a verification code to <span className="text-white">{email}</span>.
              Enter it below to activate your account and go straight to your admin dashboard.
            </p>
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <VerifySignUpForm email={email} />
        </div>
      </div>
    </main>
  );
}