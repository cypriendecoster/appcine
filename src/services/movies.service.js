import tmdb from "../api/tmdb";

export async function getPopularMovies() {
    try {
        const res = await tmdb.get("/movie/popular");
        return { data: res.data.results, error: null};
    }catch(err){
        return {
            data:null,
            error: err.response?.data?.status_message || "Erreur réseau",
        };
    }
}

export async function getTopRatedMovies() {
    try {
        const res = await tmdb.get("/movie/top_rated");
        return {data: res.data.results, error: null};
    } catch (err) {
        return {data:null, error: err.response?.data?.dtatus_message || "Erreur réseau"};
    }
}

export async function getMovieDetails(id) {
    try {
        const res = await tmdb.get(`/movie/${id}`);
        return { data: res.data, error: null};
    } catch (err) {
        return {data: null, error: err.response?.data?.status_message || "Erreur réseau"};
    }
}

export async function getMovieVideos(id) {
    try {
        const res = await tmdb.get(`/movie/${id}/videos`);
        return {data:res.data.results, error:null};
    } catch (err) {
        return {data: null, error: err.response?.data?.status_message || "Erreur réseau"};
    }
}

export async function getMovieCredits(id) {
    try {
        const res = await tmdb.get(`/movie/${id}/credits`);
        return { data: res.data.cast, error:null};
    } catch (err) {
        return{
        data: null,
        error: err.response?.data?.status_message || "Erreur réseau"
        };
    }
}