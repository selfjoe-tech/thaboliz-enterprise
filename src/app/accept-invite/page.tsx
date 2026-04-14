import Link from "next/link";

type SearchParams = Promise<{
  token?: string;
}>;

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const token = params?.token ?? "";

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-8">
          <h1 className="text-3xl font-semibold">Accept invite</h1>
          <p className="mt-3 text-sm text-white/65">
            Sign in or create an account with the invited email address, then continue.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/login?inviteToken=${encodeURIComponent(token)}`}
              className="rounded-xl bg-white px-4 py-3 font-medium text-black"
            >
              Log in
            </Link>

            <Link
              href={`/sign-up?inviteToken=${encodeURIComponent(token)}`}
              className="rounded-xl border border-white/15 px-4 py-3 font-medium text-white"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}