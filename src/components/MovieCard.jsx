import { Link } from "react-router-dom";
import { Play } from "lucide-react";

export default function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="relative block group transition-transform hover:scale-105">
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow"
            />

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end rounded-lg p-3"
            >
                <div className="flex items-center gap-2 mb-2">
                    <Play size={20} className="text-white" />
                    <span className="text-sm font-medium text-white">
                        Voir plus
                    </span>
                </div>

                <h3 className="text-md font-bold text-white">
                    {movie.title}
                </h3>

                <p className="text-xs text-gray-300">
                    ⭐ {movie.vote_average.toFixed(1)}
                </p>
            </div>
        </Link>
    );
}