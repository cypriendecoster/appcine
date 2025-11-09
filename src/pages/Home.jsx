import useFetch from "../hooks/useFetch";
import { getPopularMovies, getTopRatedMovies } from "../services/movies.service";
import MovieCarousel from "../components/MovieCarousel";

export default function Home() {
  const { data: popular, error: popularErr, loading: loadingPopular } = useFetch(getPopularMovies, []);
  const { data: topRated, error: topErr, loading: loadingTop } = useFetch(getTopRatedMovies, []);

  if (popularErr || topErr) {
    return <p className="text-red-500 p-6">❌ {popularErr || topErr}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Bienvenue 🎬</h1>

      {loadingPopular ? (
        <div className="flex gap-4 overflow-hidden mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="min-w-[150px] h-[225px] rounded-lg skeleton" />
          ))}
        </div>
      ) : (
        <MovieCarousel title="Films Populaires 🔥" movies={popular} loading={loadingPopular} />
      )}

      {loadingTop ? (
        <div className="flex gap-4 overflow-hidden mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="min-w-[150px] h-[225px] rounded-lg skeleton" />
          ))}
        </div>
      ) : (
        <MovieCarousel title="Mieux Notés ⭐" movies={topRated} loading={loadingTop} />
      )}
    </div>
  );
}


