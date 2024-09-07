import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokimonsDetails.css'
import PokimonList from "../PokimonList/PokimonList";

function PokemonsDetails(){
    const {id} = useParams();
    const [pokemon, setpokimon] = useState({})
    async function downloadPokemons() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        setpokimon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default, 
            weight: response.data.weight,
            height: response.data.height,
            types : response.data.types.map((t) => t.type.name)
        })
        
    }

    useEffect(() => {
        downloadPokemons();
    }, []);
    
    return (
        <div className="main">
        <div className="pokimon-details-wrapper">
        <div className="pokemon-details-names">{pokemon.name}</div>
        <div className="pokemon-content">
            <div className="pokemon-details-image"><img src={pokemon.image}/></div>
            <div className="Content">
                <div className="pokemon-details-weight font-style">weight: {pokemon.weight}</div>
                <div className="pokimon-details-height font-style">height: {pokemon.height}</div>
                <div className="pokimon-details-types font-style"> {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}</div>    
            </div>
        </div>
        </div>
        </div>
        
    )
}

export default PokemonsDetails;