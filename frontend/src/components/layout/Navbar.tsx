import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";


const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Browse", to: "/browse" },
    { label: "Auctions", to: "/auctions" },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="relative sticky top-0 z-50 bg-[#1c1c1c]/95 px-4 py-4 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between border border-neutral-200 bg-white px-6 py-4">
                
                {/* Logo */}
                <Link
                    to="/"
                    className="text-lg font-bold tracking-tight"
                >
                    BLANK CANVAS
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `text-sm transition-colors ${
                                    isActive
                                        ? "text-violet-500"
                                        : "text-neutral-700 hover:text-violet-500"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="absolute left-4 right-4 top-full border border-neutral-200 bg-white p-6 md:hidden">
                        <nav className="flex flex-col gap-5">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm"
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}

                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <Link
                        to="/profile"
                        className="text-sm text-[#403a42] transition hover:text-[#806292]"
                        >
                        Profile
                        </Link>

                        <button
                        type="button"
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="text-sm text-[#403a42] transition hover:text-[#806292]"
                        >
                        Logout
                        </button>
                    </div>
                    ) : (
                    <div className="flex items-center gap-4">
                        <Link
                        to="/login"
                        className="text-sm text-[#403a42] transition hover:text-[#806292]"
                        >
                        Sign in
                        </Link>

                        <Link
                        to="/register"
                        className="rounded-full bg-[#29252a] px-5 py-2.5 text-sm text-white transition hover:bg-[#403a42]"
                        >
                        Create account
                        </Link>
                    </div>
                    )}

            </div>
        </header>
    );
}

export default Navbar;