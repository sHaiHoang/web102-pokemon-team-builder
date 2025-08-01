import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useParams, Link } from "react-router-dom";

export default function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemon() {
            const { data } = await supabase
                .from("pokemon_team")
                .select("*")
                .eq("id", id)
                .single();
            setPokemon(data);
        }
        fetchPokemon();
    }, [id]);

    if (!pokemon) return <p>Loading...</p>;

    return (
        <div>
            <img src={pokemon.image_url || "/placeholder.png"} width="150" />
            <h1>{pokemon.name}</h1>
            <p>Type: {pokemon.type}</p>
            <p>Level: {pokemon.level}</p>
            <p>Favorite Move: {pokemon.favorite_move || "None"}</p>
            <Link to={`/edit/${pokemon.id}`}>Edit Pokémon</Link>
        </div>
    );
}