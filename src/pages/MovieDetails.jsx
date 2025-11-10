import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  getMovieDetails,
  getMovieVideos,
  getMovieCredits,
  getSimilarMovies
} from "../services/movies.service";

export default function MovieDetails() {
  const { id } = useParams();

  // First request (details)
  const { data: movie, loading, error } = useFetch(
    () => getMovieDetails(id),
    [id]
  );

  // Videos fallback
  const { data: videos } = useFetch(() => getMovieVideos(id), [id]);

  // Casting
  const { data: cast } = useFetch(() => getMovieCredits(id), [id]);

  // Similar movies
  const { data: similar } = useFetch(() => getSimilarMovies(id), [id]);

  if (loading) return <div className="text-white p-6">⏳ Chargement...</div>;
  if (error) return <div className="text-red-500 p-6">❌ {error}</div>;

  const allVideos = movie?.videos?.results?.length ? movie.videos.results : videos;

  const trailer =
    allVideos?.find(v => v.type === "Trailer" && v.site === "YouTube") ||
    allVideos?.find(v => v.site === "YouTube");

  return (
    <div className="relative text-white p-6 min-h-screen flex flex-col items-center">

      {/* Background */}
      <div
        className="fixed inset-0 -z-10 blur-xl opacity-30"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-5xl w-full">

        {/* Top section */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full md:w-1/3"
          />

          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

            <p className="text-gray-300 mb-4">
              📅 {movie.release_date} • ⭐ {movie.vote_average.toFixed(1)}
            </p>

            <p className="mb-4 text-lg leading-relaxed text-gray-200">
              {movie.overview || "Aucune description disponible."}
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map(g => (
                <span key={g.id} className="bg-red-600 px-2 py-1 rounded text-sm">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Trailer */}
        {trailer && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-3">Trailer 🎥</h2>
            <iframe
              width="100%"
              height="400"
              className="rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              allowFullScreen
            />
          </div>
        )}

        {/* Cast */}
        {cast && cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Distribution 👥</h2>

            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {cast
                .filter(actor => actor.profile_path)
                .slice(0, 20)
                .map(actor => (
                  <Link
                    key={actor.id}
                    to={`/actor/${actor.id}`}
                    className="w-28 flex-shrink-0 text-center hover:opacity-90 transition"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded-lg shadow-md hover:scale-105 transition"
                    />
                    <p className="mt-2 text-sm font-semibold text-gray-200 truncate">{actor.name}</p>
                    <p className="text-xs text-gray-400 truncate">{actor.character}</p>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* Similar */}
        {similar && similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Films Similaires 🎞️</h2>

            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
              {similar
                .filter(m => m.poster_path)
                .slice(0, 12)
                .map(m => (
                  <Link to={`/movie/${m.id}`} key={m.id} className="w-28 flex-shrink-0">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                      alt={m.title}
                      className="rounded-lg shadow-md hover:scale-105 transition"
                    />
                    <p className="text-xs text-gray-300 mt-1 text-center truncate">
                      {m.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}





