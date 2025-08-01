import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPokemon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            const { data, error } = await supabase
                .from("pokemon_team")
                .select("*")
                .eq("id", id)
                .single();
            if (!error) setPokemon(data);
        }
        fetchPokemon();
    }, [id]);

    if (!pokemon) return <p>Loading...</p>;

    async function handleUpdate(e) {
        e.preventDefault();

        // Always update the sprite when the name changes
        const updatedPokemon = {
            ...pokemon,
            image_url: pokemon.name
                ? `https://img.pokemondb.net/sprites/home/normal/${pokemon.name.toLowerCase()}.png`
                : null,
        };

        const { error } = await supabase
            .from("pokemon_team")
            .update(updatedPokemon)
            .eq("id", id);

        if (!error) {
            navigate("/");
        } else {
            console.error(error);
            alert("Update failed! Check console for details.");
        }
    }

    async function handleDelete() {
        const { error } = await supabase
            .from("pokemon_team")
            .delete()
            .eq("id", id);

        if (!error) {
            navigate("/");
        } else {
            console.error(error);
            alert("Delete failed! Check console for details.");
        }
    }

    return (
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "0 auto" }}>
            <h1>Edit Pokémon</h1>
            <input
                placeholder="Name"
                value={pokemon.name}
                onChange={(e) => setPokemon({ ...pokemon, name: e.target.value })}
            />
            <input
                placeholder="Type"
                value={pokemon.type}
                onChange={(e) => setPokemon({ ...pokemon, type: e.target.value })}
            />
            <input
                type="number"
                placeholder="Level"
                value={pokemon.level}
                onChange={(e) => setPokemon({ ...pokemon, level: e.target.value })}
            />
            <input
                placeholder="Favorite Move"
                value={pokemon.favorite_move || ""}
                onChange={(e) => setPokemon({ ...pokemon, favorite_move: e.target.value })}
            />
            <button type="submit">Update</button>
            <button
                type="button"
                onClick={handleDelete}
                style={{ backgroundColor: "red", color: "white" }}
            >
                Delete
            </button>
        </form>
    );
}