import tmdb from "../api/tmdb";

export async function getPopularMovies() {
    try {
        const res = await tmdb.get("/movie/popular");
        return { data: res.data.results, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau",
        };
    }
}

export async function getTopRatedMovies() {
    try {
        const res = await tmdb.get("/movie/top_rated");
        return { data: res.data.results, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.dtatus_message || "Erreur réseau" };
    }
}

export async function getMovieDetails(id) {
    try {
        const res = await tmdb.get(`/movie/${id}`);
        return { data: res.data, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.status_message || "Erreur réseau" };
    }
}

export async function getMovieVideos(id) {
    try {
        const res = await tmdb.get(`/movie/${id}/videos`);
        return { data: res.data.results, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.status_message || "Erreur réseau" };
    }
}

export async function getMovieCredits(id) {
    try {
        const res = await tmdb.get(`/movie/${id}/credits`);
        return { data: res.data.cast, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau"
        };
    }
}

export async function searchMovies(query) {
    try {
        const res = await tmdb.get(`/search/movie`, { params: { query } });
        return { data: res.data.results, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau"
        };
    }
}

export async function getSimilarMovies(id) {
    try {
        const res = await tmdb.get(`/movie/${id}/similar`);
        return { data: res.data.results, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau"
        };
    }
}

export async function advancedSearch({ query, year, genre, rating }) {
    try {
        const res = await tmdb.get(`/discover/movie`, {
            params: {
                query: query || undefined,
                primary_release_year: year || undefined,
                with_genres: genre || undefined,
                'vote_average.gte': rating || undefined,
                sort_by: "popularity.desc",
            },
        });

        return { data: res.data.results, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau",
        };
    }
}

export async function getGenres() {
    try {
        const res = await tmdb.get(`/genre/movie/list`);
        return { data: res.data.genres, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau",
        };
    }
}

export async function getActorDetails(id) {
    try {
        const res = await tmdb.get(`/person/${id}`);
        return { data: res.data, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau",
        };
    }
}

export async function getActorMovies(id) {
    try {
        const res = await tmdb.get(`/person/${id}/movie_credits`);
        return { data: res.data.cast, error: null };
    } catch (err) {
        return {
            data: null,
            error: err.response?.data?.status_message || "Erreur réseau",
        };
    }
}

// Populaires par genre (équivalent "Trending" pour un genre)
export async function getMoviesByGenre(genreId) {
    try {
        const res = await tmdb.get(`/discover/movie`, {
            params: {
                with_genres: genreId,
                sort_by: "popularity.desc",
            },
        });
        return { data: res.data.results, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.status_message || "Erreur réseau" };
    }
}

// Mieux notés par genre (on filtre un peu par vote_count pour éviter les faux top)
export async function getTopRatedByGenre(genreId) {
    try {
        const res = await tmdb.get(`/discover/movie`, {
            params: {
                with_genres: genreId,
                sort_by: "vote_average.desc",
                "vote_count.gte": 200, // évite les films obscurs avec 5 votes
            },
        });
        return { data: res.data.results, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.status_message || "Erreur réseau" };
    }
}

// Nouveautés (par date de sortie)
export async function getNewReleasesByGenre(genreId) {
    try {
        const res = await tmdb.get(`/discover/movie`, {
            params: {
                with_genres: genreId,
                sort_by: "release_date.desc",
            },
        });
        return { data: res.data.results, error: null };
    } catch (err) {
        return { data: null, error: err.response?.data?.status_message || "Erreur réseau" };
    }
}
