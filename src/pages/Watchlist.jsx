import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getStoredList } from "../utils/storage";

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        setWatchlist(getStoredList("watchlist"));
    }, []);

    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">🎯 Ma Watchlist</h1>

            {watchlist.length === 0 ? (
                <p className="text-gray-400">
                    Aucun film dans votre liste à regarder.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {watchlist.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
