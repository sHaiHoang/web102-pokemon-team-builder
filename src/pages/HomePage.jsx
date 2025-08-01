import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        fetchPokemon();
    }, []);

    async function fetchPokemon() {
        const { data, error } = await supabase
            .from("pokemon_team")
            .select("*")
            .order("created_at", { ascending: false });
        if (!error) setPokemon(data);
    }

    return (
        <div style={{ textAlign: "center", width: "100%" }}>
        <h1>My Pokémon Team</h1>
        {pokemon.length === 0 ? (
            <p>No Pokémon yet! Add some to your team.</p>
        ) : (
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "20px",
                }}
                >
                {pokemon.map((p) => (
                    <div
                    key={p.id}
                    style={{
                        border: "3px solid #2a75bb",       // Pokémon blue
                        backgroundColor: "#fffeff",        // light background
                        borderRadius: "12px",
                        padding: "15px",
                        width: "180px",
                        textAlign: "center",
                        boxShadow: "4px 4px 0px #ffcb05",  // Pokémon yellow shadow
                        transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                    <img
                        src={p.image_url || "/placeholder.png"}
                        alt={p.name}
                        width="100"
                        style={{ imageRendering: "pixelated" }}
                    />
                    <h2 style={{ color: "#2a75bb", fontSize: "1rem" }}>{p.name}</h2>
                    <p>Type: {p.type}</p>
                    <p>Lvl: {p.level}</p>
                    <Link to={`/pokemon/${p.id}`} style={{ color: "#ff0000" }}>
                        View
                    </Link>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
}