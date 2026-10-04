import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAccountOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function closeMenus() {
    setAccountOpen(false);
    setMobileOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenus();
    navigate('/', { replace: true });
  }

  const navLinks = [
    { label: 'Gallery', to: '/browse' },
    { label: 'Auctions', to: '/auctions' },
    { label: 'About', to: '/about' },
  ];

  const role = user?.role;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e2e9] bg-[#f7f4f0]/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenus}
          className="font-serif text-2xl tracking-tight text-[#342c38] transition hover:text-[#82708f]"
        >
          Blank Canvas
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-[#6f6672] transition hover:text-[#8a7198]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Account / authentication actions */}
        <div className="flex items-center gap-3">
          {!loading && !isAuthenticated && (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                to="/login"
                className="px-3 py-2 text-sm text-[#514653] transition hover:text-[#8a7198]"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-[#e8def0] px-5 py-2.5 text-sm text-[#55435f] transition hover:bg-[#ded0e9]"
              >
                Create account
              </Link>
            </div>
          )}

          {!loading && isAuthenticated && user && (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((open) => !open)}
                className="flex items-center gap-2 rounded-full border border-[#e5dce8] bg-white/70 px-3 py-2 transition hover:border-[#cdbbd8] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#b8a0c9]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8def0] font-serif text-sm text-[#65536f]">
                  {user.name.charAt(0).toUpperCase()}
                </span>

                <span className="hidden max-w-32 truncate text-sm text-[#403844] sm:inline">
                  {user.name}
                </span>

                <svg
                  aria-hidden="true"
                  className={`h-4 w-4 text-[#82708f] transition-transform ${
                    accountOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  aria-label="Account menu"
                  className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-[#e9e0eb] bg-[#fffdfb] shadow-[0_20px_60px_rgba(60,40,70,0.15)]"
                >
                  {/* Account identity */}
                  <div className="border-b border-[#eee7ef] px-5 py-4">
                    <p className="truncate font-serif text-lg text-[#342c38]">
                      {user.name}
                    </p>

                    <p className="mt-1 break-all text-xs text-[#857b89]">
                      {user.email}
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-[#e8def0] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#65536f]">
                      {user.role}
                    </span>
                  </div>

                  {/* Account options */}
                  <div className="p-2">
                    <Link
                      role="menuitem"
                      to="/profile"
                      onClick={closeMenus}
                      className="block rounded-xl px-3 py-2.5 text-sm text-[#514653] transition hover:bg-[#f5eff7] hover:text-[#70577f]"
                    >
                      Profile
                    </Link>

                    {role === 'BUYER' && (
                      <div className="px-3 py-2.5">
                        <p className="text-sm text-[#514653]">
                          My Bids
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-[#968b99]">
                          Your bidding activity will appear here when
                          the bidding features are implemented.
                        </p>
                      </div>
                    )}

                    {role === 'SELLER' && (
                      <div className="px-3 py-2.5">
                        <p className="text-sm text-[#514653]">
                          Seller tools
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-[#968b99]">
                          Artwork and auction management will be
                          available when those features are built.
                        </p>
                      </div>
                    )}

                    {role === 'ADMIN' && (
                      <div className="px-3 py-2.5">
                        <p className="text-sm text-[#514653]">
                          Administration
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-[#968b99]">
                          Administration tools will appear here
                          when the admin dashboard is implemented.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-[#eee7ef] p-2">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-[#9a5555] transition hover:bg-[#fbefed]"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5dce8] text-[#514653] transition hover:bg-white md:hidden"
          >
            {mobileOpen ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
              >
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-[#e9e2e9] bg-[#f7f4f0] px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMenus}
                className="rounded-xl px-3 py-3 text-sm text-[#514653] transition hover:bg-white"
              >
                {item.label}
              </Link>
            ))}

            {!loading && !isAuthenticated && (
              <>
                <div className="my-2 border-t border-[#e9e2e9]" />

                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="rounded-xl px-3 py-3 text-sm text-[#514653] transition hover:bg-white"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenus}
                  className="rounded-xl bg-[#e8def0] px-3 py-3 text-sm text-[#55435f] transition hover:bg-[#ded0e9]"
                >
                  Create account
                </Link>
              </>
            )}

            {!loading && isAuthenticated && user && (
              <>
                <div className="my-2 border-t border-[#e9e2e9]" />

                <div className="px-3 py-2">
                  <p className="font-serif text-lg text-[#342c38]">
                    {user.name}
                  </p>
                  <p className="mt-1 break-all text-xs text-[#857b89]">
                    {user.email}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={closeMenus}
                  className="rounded-xl px-3 py-3 text-sm text-[#514653] transition hover:bg-white"
                >
                  Profile
                </Link>

                {role === 'BUYER' && (
                  <p className="px-3 py-3 text-sm text-[#857b89]">
                    My Bids — coming with bidding features
                  </p>
                )}

                {role === 'SELLER' && (
                  <p className="px-3 py-3 text-sm text-[#857b89]">
                    Seller tools — coming later
                  </p>
                )}

                {role === 'ADMIN' && (
                  <p className="px-3 py-3 text-sm text-[#857b89]">
                    Administration — coming later
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 rounded-xl px-3 py-3 text-left text-sm text-[#9a5555] transition hover:bg-[#fbefed]"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}