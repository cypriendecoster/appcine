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