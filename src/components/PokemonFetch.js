import React, {useEffect, useState } from 'react';
import { useRef } from 'react';


function PokemonFetch() {
    //useState hook används som en variabel som kan ändra o uppdateras värde, (reactive)
    let preventDoubleFetch = useRef(false);

    let [pokemon, setPokemon] = useState([]);
    let [nextLoad, setNextLoad] = useState(`https://pokeapi.co/api/v2/pokemon?limit=9`); //en limit på 9, för att sen kunna nå resterande pokemon +9 osv
   

    const getPokemons = async () => { //async som Promises, framför funktionsnamn, await i funktionens body

        let response = await fetch(nextLoad);
        let data = await response.json();
        setNextLoad(data.next); //next kommer ifrån api:et

        function getSpecificPokemonsInfo (result) {
            result.forEach (async (pokemon) => {
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)  //dynamisk länk för att få rätt info fr rätt pokemon
                let data = await response.json();

                setPokemon(currentList => [...currentList, data]);
                // console.log(pokemon);
            })
        }

        getSpecificPokemonsInfo(data.results)
    }

   useEffect(() => {
    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;

    getPokemons();

   }, []); //[] empty or with variables,checking when changing = run function once on first render


   return (
    <div className='pokedex'>
        {pokemon.map((p, i) => (
            <div className='pokemon-card'>
                <h2 className='pokemon-title' key={p.name}> {p.name} </h2>
                <img src={p.sprites.front_default} alt="pokemon-image" />  
                {/* {p.sprites.other.dream_world.front_default} */}
                <div className='pokemon-weight' > Weight:{p.weight} </div>
                <div className='pokemon-height'> Height:{p.height} </div>
            </div>
        )
        
        
        )}
        <button className='load-more' onClick={() => getPokemons()}> Load more </button>
        {/* onclick kör functionen från början igen, läser om next 9 pokemons från apiet*/}
    </div>
   )
}

export default PokemonFetch;