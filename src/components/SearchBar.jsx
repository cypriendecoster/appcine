import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import { searchMovies } from "../services/movies.service";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);

    const debouncedQuery = useDebounce(query, 400);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            return;
        }

        async function fetchData() {
            const { data } = await searchMovies(debouncedQuery);
            setResults(data?.slice(0, 8) || []);
        }

        fetchData();
    }, [debouncedQuery]);

    useEffect(() => {
        const handler = (e) => {
            if (!containerRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-md">
            <div className="flex items-center bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                <Search className="text-gray-400 ml-3" size={20} />

                <input
                    className="flex-1 bg-transparent text-white px-3 py-2 outline-none"
                    placeholder="Rechercher un film..."
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                />
            </div>

            {/*results dropDown */}
            {open && results.length > 0 && (
                <div className="absolute mt-2 bg-gray-900 border border-gray-700 rounded-lg w-full max-h-80 overflow-y-auto shadow-xl z-50">
                    {results.map(movie => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="flex gap-3 p-2 hover:bg-gray-800"
                            onClick={() => setOpen(false)}
                        >
                            <img
                                src={movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                    : "/placeholder.png"}
                                className="w-12 h-16 rounded object-cover"
                            />

                            <div className="flex flex-col justify-center">
                                <span className="text-white text-sm font-medium">
                                    {movie.title}
                                </span>
                                <span className="text-gray-400 text-xs">
                                    ⭐ {movie.vote_average?.toFixed(1)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

