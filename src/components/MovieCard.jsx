import { useNavigate } from "react-router-dom";
import { Play, Heart, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toggleStoredItem, isStored } from "../utils/storage";
import { motion } from "framer-motion";

export default function MovieCard({ movie, index = 0 }) {
    const [fav, setFav] = useState(false);
    const [watch, setWatch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFav(isStored("favorites", movie.id));
        setWatch(isStored("watchlist", movie.id));
    }, [movie.id]);

    const handleFav = (e) => {
        e.stopPropagation();
        toggleStoredItem("favorites", movie);
        setFav(!fav);
    };

    const handleWatch = (e) => {
        e.stopPropagation();
        toggleStoredItem("watchlist", movie);
        setWatch(!watch);
    };

    return (
        <motion.div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="relative block group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index * 0.03, 0.4), duration: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
        >
            {/* Poster */}
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full h-full object-cover"
            />

            {/* Overlay */}
            <div
                className="
          absolute inset-0 
          bg-black/80 
          opacity-0 
          group-hover:opacity-100 
          transition 
          flex flex-col justify-between
          rounded-lg 
          p-3
        "
            >
                {/* Boutons favoris / watchlist */}
                <div className="flex justify-end gap-2">
                    <button onClick={handleFav} title="Favoris">
                        <Heart
                            size={20}
                            className={fav ? "text-red-500" : "text-white"}
                            fill={fav ? "red" : "none"}
                        />
                    </button>

                    <button onClick={handleWatch} title="Watchlist">
                        <CheckCircle
                            size={20}
                            className={watch ? "text-yellow-400" : "text-white"}
                            fill={watch ? "yellow" : "none"}
                        />
                    </button>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Play size={20} className="text-white" />
                        <span className="text-sm font-medium text-white">Voir plus</span>
                    </div>

                    <h3 className="text-md font-bold text-white truncate">{movie.title}</h3>
                    <p className="text-xs text-gray-300">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
            </div>
        </motion.div>
    );
}



