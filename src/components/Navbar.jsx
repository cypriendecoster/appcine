import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { to: "/", label: "Accueil" },
        { to: "/movies", label: "Films" },
        { to: "/search", label: "Recherche" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-lg z-50 shadow">
            <div className="max-w-7x1 mx-auto flex items-center justify-between px-4 py-3">
                {/*logo*/}
                <Link to="/" className="text-2x1 font-bold text-red-500 tracking-wide">
                    CINE<span className="text-white">FLIX</span>
                </Link>
                {/*Desktop Links*/}
                <nav className="hidden md:flex items-center gap-6">
                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `text-sm font-medium hover:text-red-500 transition ${isActive ? "text-red-500" : "text-white"
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    <div className="hidden md:block w-64">
                        <SearchBar />
                    </div>
                </nav>

                {/* Mobile Menu Button*/}
                <button
                    className="md:hidden text-white"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/*Mobile Menu*/}
            {open && (
                <div className="md:hidden bg-black/90 border-t border-gray-800">
                    <nav className="flex flex-col text-center p-4 gap-4">
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `text-lg font-medium hover:text-red-500 transition ${isActive ? "text-red-500" : "text-white"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}