import {useEffect, useState} from 'react';
import axios from 'axios';
import './PokimonList.css';
import Pokemon from '../Pokemon/Pokemon.jsx';
import Loading from '../Loading/Loading.jsx';

function PokimonList(){

    const [pokimonList, setPokimonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexurl, setpokedexurl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        //Feching data from url
        const response = await axios.get(pokedexurl);
        // console.log(response);
        
        //feching result from data 
        const pokimonResults = response.data.results;
        console.log(pokimonResults);

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        //Then pass data to Map and extrect url from result and save in pokimonResultsPromise
        const pokimonResultsPromise = pokimonResults.map((pokemon) => axios.get(pokemon.url));
        // console.log(pokimonResultsPromise);

        const pokemonData =await axios.all(pokimonResultsPromise);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            

            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        });

        setPokimonList(res);
        setIsLoading(false)
    }
   
    useEffect(() => {
        downloadPokemons();
    },[pokedexurl]);

    return(
        <div className='pokimon-list-wrapper'>
            <div className='controls'>
            <button disabled={prevUrl == undefined} onClick={() => setpokedexurl(prevUrl)}>Previous</button>
            <button disabled={nextUrl == undefined} onClick={() => setpokedexurl(nextUrl)}>Next</button>
            </div>
            <div className='pokemon-wrapper'>
            {
                (isLoading )? <Loading/> : pokimonList.map((p) => <Pokemon name={p.name}  image={p.image} key={p.id} id={p.id}/>)
            }
            </div>

            <div className='controls'>
            <button disabled={prevUrl == undefined} onClick={() => setpokedexurl(prevUrl)}>Previous</button>
            <button disabled={nextUrl == undefined} onClick={() => setpokedexurl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}

export default PokimonList; 