import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getStoredList } from "../utils/storage";

export default function Collection() {
  const [tab, setTab] = useState("favorites");
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    setFavorites(getStoredList("favorites"));
    setWatchlist(getStoredList("watchlist"));
  }, []);

  const activeStyle =
    "px-4 py-2 font-semibold border-b-2 border-red-500 text-red-500";
  const inactiveStyle =
    "px-4 py-2 font-semibold text-gray-400 hover:text-white transition";

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🎬 Ma Collection</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
        <button
          onClick={() => setTab("favorites")}
          className={tab === "favorites" ? activeStyle : inactiveStyle}
        >
          ❤️ Favoris
        </button>

        <button
          onClick={() => setTab("watchlist")}
          className={tab === "watchlist" ? activeStyle : inactiveStyle}
        >
          🎯 Watchlist
        </button>
      </div>

      {/* Content */}
      {tab === "favorites" && (
        <>
          {favorites.length === 0 ? (
            <p className="text-gray-400">Aucun film dans vos favoris.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "watchlist" && (
        <>
          {watchlist.length === 0 ? (
            <p className="text-gray-400">Aucun film dans votre watchlist.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
