import VerifySignUpForm from "./verify-sign-up-form";

type SearchParams = Promise<{
  email?: string;
  error?: string;
  inviteToken?: string;
}>;

export default async function VerifySignUpPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const email = params?.email ?? "";
  const error = params?.error;
  const inviteToken = params?.inviteToken ?? "";

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Verify account</h1>
            <p className="mt-2 text-sm text-white/55">
              Enter the code sent to {email}.
            </p>
          </div>

          {error ? (
            <div className="mb-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <VerifySignUpForm email={email} inviteToken={inviteToken} />
        </div>
      </div>
    </main>
  );
}