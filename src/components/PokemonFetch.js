import React, {useEffect, useState } from 'react';
import { useRef } from 'react';


function PokemonFetch() {
    //useState hook används som en variabel som kan ändra o uppdateras värde, (reactive)
    let preventDoubleFetch = useRef(false);
    let [pokemon, setPokemon] = useState([]);
   

    const getPokemons = async () => { //async som Promises, framför funktionsnamn, await i funktionens body

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
        let data = await response.json();
        setPokemon(data.results);
        console.log(data.results)
    }

   useEffect(() => {
    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;

    getPokemons();

   }, []); //[] empty or with variables,checking when changing = run function once on first render
}

export default PokemonFetch;