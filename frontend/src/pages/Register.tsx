import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
        setError("Name is required.");
        return;
    }

    if (!email.trim()) {
        setError("Email is required.");
        return;
    }

    if (!email.includes("@")) {
        setError("Please enter a valid email.");
        return;
    }

    if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setLoading(true);

    try {
        await register(name, email, password);

        navigate("/login", {
        state: {
            message: "Account created successfully. Please sign in.",
        },
        });
    } catch (error: any) {
        const message =
        error?.response?.data?.message ||
        "Unable to create your account. Please try again.";

        setError(
        Array.isArray(message)
            ? message.join(", ")
            : message,
        );
    } finally {
        setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4f0] px-6 py-12 text-[#29252a]">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(60,45,70,0.08)] md:grid-cols-2">

          {/* Register form */}
          <section className="order-2 flex min-h-[700px] items-center justify-center px-7 py-12 sm:px-12 md:order-1">
            <div className="w-full max-w-md">

              <div className="mb-9">
                <p className="font-serif text-sm uppercase tracking-[0.25em] text-[#8b6f9e]">
                  Join the gallery
                </p>

                <h1 className="mt-3 font-serif text-4xl text-[#29252a]">
                  Create an account
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#77717a]">
                  Create your Blank Canvas account and start discovering
                  artwork.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#403a42]"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    minLength={2}
                    className="w-full rounded-xl border border-[#ddd6df] bg-[#faf9f8] px-4 py-3.5 text-sm text-[#29252a] outline-none transition placeholder:text-[#aaa3ab] focus:border-[#9b7daf] focus:bg-white focus:ring-2 focus:ring-[#c8b8d9]/40"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#403a42]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-[#ddd6df] bg-[#faf9f8] px-4 py-3.5 text-sm text-[#29252a] outline-none transition placeholder:text-[#aaa3ab] focus:border-[#9b7daf] focus:bg-white focus:ring-2 focus:ring-[#c8b8d9]/40"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#403a42]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-[#ddd6df] bg-[#faf9f8] px-4 py-3.5 text-sm text-[#29252a] outline-none transition placeholder:text-[#aaa3ab] focus:border-[#9b7daf] focus:bg-white focus:ring-2 focus:ring-[#c8b8d9]/40"
                  />
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-medium text-[#403a42]"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-[#ddd6df] bg-[#faf9f8] px-4 py-3.5 text-sm text-[#29252a] outline-none transition placeholder:text-[#aaa3ab] focus:border-[#9b7daf] focus:bg-white focus:ring-2 focus:ring-[#c8b8d9]/40"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#29252a] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#403a42] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              {/* Login link */}
              <p className="mt-8 text-center text-sm text-[#77717a]">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-[#806292] transition hover:text-[#5e4770]"
                >
                  Sign in
                </Link>
              </p>

              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-xs uppercase tracking-[0.15em] text-[#aaa3ab] transition hover:text-[#6f6671]"
                >
                  ← Back to gallery
                </Link>
              </div>

            </div>
          </section>

          {/* Right visual section */}
          <section className="order-1 relative hidden min-h-[700px] overflow-hidden bg-[#d9cfdf] md:order-2 md:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.5),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(100,70,120,0.16),transparent_40%)]" />

            <div className="relative flex h-full flex-col justify-between p-10">
              <div className="flex justify-end">
                <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#4c3d52]">
                  Blank Canvas
                </p>
              </div>

              <div>
                <h2 className="max-w-md font-serif text-5xl leading-tight text-[#29212d]">
                  Every collection
                  <br />
                  begins with
                  <br />
                  one discovery.
                </h2>

                <p className="mt-6 max-w-sm font-serif text-xl leading-relaxed text-[#4c3d52]">
                  Browse, collect and participate in auctions from a growing
                  community of artists.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}