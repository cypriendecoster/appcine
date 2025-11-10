import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Collection from "./pages/Collection";
import AdvancedSearch from "./pages/AdvancedSearch";
import ActorDetails from "./pages/ActorDetails";

export default function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/search" element={<AdvancedSearch />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}