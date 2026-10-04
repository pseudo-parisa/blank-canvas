import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f4f0] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#9b8fa3]">
            Your account
          </p>

          <h1 className="font-serif text-5xl text-[#2f2933]">
            Profile
          </h1>

          <p className="mt-3 max-w-xl text-[#77717a]">
            Manage your account details and view your Blank Canvas
            membership information.
          </p>
        </div>

        {/* Profile card */}
        <section className="rounded-3xl border border-[#e6e0e5] bg-white/70 p-8 shadow-[0_20px_60px_rgba(80,60,90,0.08)] backdrop-blur-sm">
          {/* Avatar / initials */}
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8def0] font-serif text-2xl text-[#65536f]">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="font-serif text-2xl text-[#2f2933]">
                {user.name}
              </h2>

              <p className="text-sm text-[#88818a]">
                {user.email}
              </p>
            </div>
          </div>

          {/* Account information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f7f4f0] p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#9b8fa3]">
                Name
              </p>

              <p className="text-base text-[#403844]">
                {user.name}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f4f0] p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#9b8fa3]">
                Email
              </p>

              <p className="break-all text-base text-[#403844]">
                {user.email}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f7f4f0] p-5 sm:col-span-2">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#9b8fa3]">
                Account type
              </p>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#e8def0] px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#65536f]">
                  {user.role}
                </span>

                <p className="text-sm text-[#77717a]">
                  Your current Blank Canvas account role.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}