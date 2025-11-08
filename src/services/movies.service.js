import tmdb from "../api/tmdb";

export async function getPopularMovies() {
    try {
        const res = await tmdb.get("/movie/popular");
        return { data: res.data.results, error: null};
    }catch(error){
        return {
            data:null,
            error: error.response?.data?.status_message || "Erreur réseau",
        };
    }
}