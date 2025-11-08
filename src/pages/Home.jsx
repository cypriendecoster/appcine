import useFetch from "../hooks/useFetch";
import { getPopularMovies } from "../services/movies.service";
import MovieCarousel from "../components/MovieCarousel";

export default function Home() {
  const { data: movies, error, loading } = useFetch(getPopularMovies, []);

  if (loading) return <p className="text-white p-6">⏳ Chargement...</p>;
  if (error) return <p className="text-red-500 p-6">❌ {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Bienvenue 🎬</h1>
      <MovieCarousel title="Films Populaires 🔥" movies={movies} />
    </div>
  );
}

