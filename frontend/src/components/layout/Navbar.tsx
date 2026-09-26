import { Link, NavLink } from "react-router-dom";
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

                {/* Login / Sign Up */}
                <Link
                    to="/login"
                    className="text-sm text-violet-500 transition-colors hover:text-violet-700"
                >
                    Login / Sign Up
                </Link>

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
            </div>
        </header>
    );
}

export default Navbar;