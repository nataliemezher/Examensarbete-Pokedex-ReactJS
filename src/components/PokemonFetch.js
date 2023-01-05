import React, {useEffect, useState } from 'react';
import { useRef } from 'react';
import Search from './Search';


function PokemonFetch() {
    //useState hook används som en variabel som kan ändra o uppdateras värde, (reactive)
    let preventDoubleFetch = useRef(false);

    let [searchValue, setSearchValue] = useState('');
    let [filtered, setFiltered] = useState([]);
    
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
              
            })
        }

        getSpecificPokemonsInfo(data.results);
        // console.log(data.results);

    }
    
     
    function searchPokemon (searchValue)  {
        setSearchValue(searchValue)
        if (searchValue !== '') {
            let filtered = pokemon.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
        })
        setFiltered(filtered);
        } else {
            setFiltered(pokemon)
        }
        
        
         console.log(searchValue);
    }

    function handleSubmit(e) {
        e.preventDefault();
        getPokemons();

    }
   
  
    

  
    
 

   useEffect(() => {
    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;

    getPokemons();
    
    

   }, []); //[] empty or with variables,checking when changing = run function once on first render

   return (
    
    <div className='pokedex'>
         <div className="searchbar"> 
        <form onSubmit={handleSubmit}>
                <input
                    placeholder="search pokemon..."
                    type="text"
                    onChange={ (e) => searchPokemon(e.target.value)}
                /> 
                </form>
        </div>
        
        
        { pokemon.map((p, i) => (
            <div key={i} className={`pokemon-card ${p.types[0].type.name}`} >
                <h2 className='pokemon-title' key={p.name}> {p.name} </h2>
                <img src={p.sprites.front_default} alt="pokemon-img" />  
                {/* {p.sprites.other.dream_world.front_default} */}
                <div className='pokemon-details'>
                    <div className='pokemon-weight' > <span className='weight-title'> Weight: </span> {p.weight} </div>
                    <div className='pokemon-height'> <span className='height-title'>Height:</span>  {p.height} </div>
                    <div className='pokemon-type'> <span className='type-title'> Type:</span> {p.types[0].type.name} </div>
                    <div className='pokemon-abilities'> <span className='abilities-title'>Abilities:</span>  {p.abilities[0].ability.name},   </div>
                </div>
            </div>
        ))
        
        }
        <div className='load-more'><button onClick={() => getPokemons()}> Load more </button> </div>
        {/* onclick kör functionen från början igen, läser om next 9 pokemons från apiet*/}
    </div>
   )
}

export default PokemonFetch;