import { useEffect, useState } from "react";
import { advancedSearch, getGenres } from "../services/movies.service";
import MovieCard from "../components/MovieCard";
import useDebounce from "../hooks/useDebounce";

export default function AdvancedSearch() {
    const [query, setQuery] = useState("");
    const [year, setYear] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [genres, setGenres] = useState([]);
    const [results, setResults] = useState([]);

    const debouncedQuery = useDebounce(query, 400);

    useEffect(() => {
        async function loadGenres() {
            const { data } = await getGenres();
            setGenres(data);
        }
        loadGenres();
    }, []);

    useEffect(() => {
        async function searchMovies() {
            const { data } = await advancedSearch({ query, year, genre, rating });
            setResults(data || []);
        }
        searchMovies();
    }, [debouncedQuery, year, genre, rating]);

    return (
        <div className="p-6 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">🔎 Recherche Avancée</h1>

            {/* Form */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">

                {/* Titre */}
                <input
                    className="bg-gray-800 p-2 rounded outline-none"
                    placeholder="Rechercher un film..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {/* Année */}
                <input
                    type="number"
                    className="bg-gray-800 p-2 rounded outline-none"
                    placeholder="Année"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                {/* Genre */}
                <select
                    className="bg-gray-800 p-2 rounded outline-none"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option value="">Genre</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>

                {/* Note */}
                <select
                    className="bg-gray-800 p-2 rounded outline-none"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="">Note minimum</option>
                    <option value="5">⭐ 5+</option>
                    <option value="6">⭐ 6+</option>
                    <option value="7">⭐ 7+</option>
                    <option value="8">⭐ 8+</option>
                </select>
            </div>

            {/* Résultats */}
            {results.length === 0 ? (
                <p className="text-gray-400">Aucun résultat...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {results.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
