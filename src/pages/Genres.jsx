import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../services/movies.service";

export default function Genres() {
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            const { data, error } = await getGenres();
            if (error) return setError(error);
            setGenres(data || []);
        }
        load();
    }, []);

    if (error) return <div className="text-red-500 p-6">❌ {error}</div>;

    return (
        <div className="p-6 text-white min-h-screen max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">🎭 Genres</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {genres.map((g) => (
                    <Link
                        key={g.id}
                        to={`/genre/${g.id}?name=${encodeURIComponent(g.name)}`}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:bg-gray-800 transition shadow"
                    >
                        <div className="text-lg font-semibold">{g.name}</div>
                        <div className="text-xs text-gray-400 mt-1">Voir les films →</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
