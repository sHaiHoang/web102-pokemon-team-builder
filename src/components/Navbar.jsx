import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <h2>Pokémon</h2>
            <Link to="/">Home</Link>
            <Link to="/create">Add Pokémon</Link>
        </nav>
    );
}