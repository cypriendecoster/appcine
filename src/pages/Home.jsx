import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/movies.service";
import MovieCard from "../components/MovieCard";
import MovieCarousel from "../components/MovieCarousel";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await getPopularMovies("/movie/popular")

            if (error) {
                return setError(error);
            }
            setMovies(data);
        }
        fetchData();
    }, []);

    if (error) return <p className="text-red-500 p-6">❌ {error}</p>

    return (
        <div className="p-6">
            <h1 className="text-4x1 font-bold mb-6">Bienvenue 🎬</h1>
            <MovieCarousel title="Films Populaires 🔥" movies={movies} />
        </div>
    );
}
