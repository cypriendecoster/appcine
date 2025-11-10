import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getStoredList } from "../utils/storage";
import PageFade from "../components/PageFade";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getStoredList("favorites"));
  }, []);

  return (
    <PageFade>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">❤️ Films Favoris</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-400">Vous n'avez encore ajouté aucun film en favoris.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </PageFade>
  );
}
