import FinishLoginClient from "./finish-login-client";

type SearchParams = Promise<{
  inviteToken?: string;
}>;

export default async function FinishLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const inviteToken = params?.inviteToken ?? "";

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <FinishLoginClient inviteToken={inviteToken} />
      </div>
    </main>
  );
}