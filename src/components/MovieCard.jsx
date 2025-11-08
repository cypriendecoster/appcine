export default function MovieCard({ movie }) {
    return (
        <div className="transition transform hover:scale-105 hover:z-10">
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow"
            />
            <h3 className="mt-2 text-sm font-semibold truncate">{movie.title}</h3>
        </div>
    );
}