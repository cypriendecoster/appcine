import { useParams, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
    getMoviesByGenre,
    getTopRatedByGenre,
    getNewReleasesByGenre,
} from "../services/movies.service";
import MovieCarousel from "../components/MovieCarousel";

function useQuery() {
    const { search } = useLocation();
    return new URLSearchParams(search);
}

export default function GenreDetails() {
    const { id } = useParams();
    const query = useQuery();
    const name = query.get("name") || "Genre";

    const {
        data: popular,
        loading: loadingPopular,
        error: errPopular,
    } = useFetch(() => getMoviesByGenre(id), [id]);

    const {
        data: top,
        loading: loadingTop,
        error: errTop,
    } = useFetch(() => getTopRatedByGenre(id), [id]);

    const {
        data: recent,
        loading: loadingRecent,
        error: errRecent,
    } = useFetch(() => getNewReleasesByGenre(id), [id]);

    const error = errPopular || errTop || errRecent;

    if (error) return <div className="text-red-500 p-6">❌ {error}</div>;

    return (
        <div className="p-6 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">
                🎬 {name}
            </h1>

            <MovieCarousel title={`Populaires ${name} 🔥`} movies={popular || []} loading={loadingPopular} />
            <MovieCarousel title={`Mieux notés ${name} ⭐`} movies={top || []} loading={loadingTop} />
            <MovieCarousel title={`Nouveautés ${name} 🆕`} movies={recent || []} loading={loadingRecent} />
        </div>
    );
}
