import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-900 text-white flex gap-4">
        <Link to="/">Accueil</Link>
        <Link to="/movies">Films</Link>
        <Link to="/search">Recherche</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}