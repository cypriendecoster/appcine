import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActorDetails, getActorMovies } from "../services/movies.service";
import MovieCard from "../components/MovieCard";

export default function ActorDetails() {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            const { data: actorData, error: actorErr } = await getActorDetails(id);
            const { data: movieData } = await getActorMovies(id);

            if (actorErr) return setError(actorErr);

            setActor(actorData);
            setMovies(movieData?.slice(0, 20) || []);
        }
        fetchData();
    }, [id]);

    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!actor) return <div className="text-gray-400 p-6">Chargement...</div>;

    return (
        <div className="p-6 text-white max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start">

                {/* Photo */}
                <img
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-lg shadow-lg w-48 md:w-64"
                />

                {/* Info */}
                <div>
                    <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>

                    <p className="text-gray-300 mb-4">{actor.biography || "Biographie indisponible."}</p>

                    <p className="text-gray-400 mb-2">
                        📅 Né(e) : {actor.birthday || "?"}
                        {actor.place_of_birth && ` à ${actor.place_of_birth}`}
                    </p>

                    {actor.deathday && (
                        <p className="text-gray-400 mb-2">✝️ Décédé(e) : {actor.deathday}</p>
                    )}
                </div>
            </div>

            {/* Films */}
            <h2 className="text-2xl font-bold mt-10 mb-4">🎬 Films</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}
