import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePokemon from "./pages/CreatePokemon";
import EditPokemon from "./pages/EditPokemon";
import PokemonDetail from "./pages/PokemonDetail";

export default function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePokemon />} />
                    <Route path="/edit/:id" element={<EditPokemon />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                </Routes>
            </div>
        </Router>
    );
}