import MovieCard from "./MovieCard";
import SkeletonMovieCard from "./SkeletonMovieCard";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieCarousel({ title, movies, loading }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const amount = container.clientWidth * 0.8;

    container.scrollLeft += direction === "left" ? -amount : amount;
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      <div className="relative">
        
        {/* Bouton gauche */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition z-20"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Contenu scroll */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar py-2"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonMovieCard key={i} />
              ))
            : movies.map(movie => (
                <div key={movie.id} className="min-w-[150px]">
                  <MovieCard movie={movie} />
                </div>
              ))
          }
        </div>

        {/* Bouton droit */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition z-20"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
