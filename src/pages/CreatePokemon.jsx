import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreatePokemon() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [level, setLevel] = useState("");
    const [favoriteMove, setFavoriteMove] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const { data, error } = await supabase.from("pokemon_team").insert([
            {
                name,
                type,
                level: level ? parseInt(level) : null,
                favorite_move: favoriteMove || null,
                image_url: name
                    ? `https://img.pokemondb.net/sprites/home/normal/${name.toLowerCase()}.png`
                    : null,
            },
        ]);

        console.log("Data:", data);
        console.log("Error:", error);

        if (!error) {
            navigate("/");
        } else {
            alert("Insert failed! Check console for details.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Pokémon</h1>
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Type" onChange={(e) => setType(e.target.value)} />
            <input
                type="number"
                placeholder="Level"
                onChange={(e) => setLevel(e.target.value)}
            />
            <input
                placeholder="Favorite Move"
                onChange={(e) => setFavoriteMove(e.target.value)}
            />
            <button type="submit">Add Pokémon</button>
        </form>
    );
}