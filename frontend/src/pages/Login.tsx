import { type FormEvent, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  const successMessage = location.state?.message;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
        setError("Email is required.");
        return;
    }

    if (!email.includes("@")) {
        setError("Please enter a valid email.");
        return;
    }

    if (!password) {
        setError("Password is required.");
        return;
    }

    setLoading(true);

    try {
        await login(email, password);
        navigate("/");
    } catch {
        setError("Invalid email or password.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4f0] px-6 py-12 text-[#29252a]">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(60,45,70,0.08)] md:grid-cols-2">

          {/* Left visual section */}
          <section className="relative hidden min-h-[650px] overflow-hidden bg-[#c8b8d9] md:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(100,70,120,0.15),transparent_40%)]" />

            <div className="relative flex h-full flex-col justify-between p-10">
              <div>
                <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#4c3d52]">
                  Blank Canvas
                </p>

                <h2 className="mt-6 max-w-sm font-serif text-5xl leading-tight text-[#29212d]">
                  Art worth
                  <br />
                  discovering.
                </h2>
              </div>

              <p className="max-w-sm font-serif text-xl leading-relaxed text-[#4c3d52]">
                Enter the gallery and discover artwork from emerging and
                established artists.
              </p>
            </div>
          </section>

          {/* Login form */}
          <section className="flex min-h-[650px] items-center justify-center px-7 py-12 sm:px-12">
            <div className="w-full max-w-md">

              <div className="mb-10">
                <p className="font-serif text-sm uppercase tracking-[0.25em] text-[#8b6f9e]">
                  Welcome back
                </p>

                <h1 className="mt-3 font-serif text-4xl text-[#29252a]">
                  Sign in
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#77717a]">
                  Sign in to continue exploring Blank Canvas.
                </p>

                {successMessage && (
                    <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {successMessage}
                    </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

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
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#403a42]"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-[#ddd6df] bg-[#faf9f8] px-4 py-3.5 text-sm text-[#29252a] outline-none transition placeholder:text-[#aaa3ab] focus:border-[#9b7daf] focus:bg-white focus:ring-2 focus:ring-[#c8b8d9]/40"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
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
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              {/* Register link */}
              <p className="mt-8 text-center text-sm text-[#77717a]">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="font-medium text-[#806292] transition hover:text-[#5e4770]"
                >
                  Create one
                </Link>
              </p>

              {/* Back */}
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
        </div>
      </div>
    </main>
  );
}