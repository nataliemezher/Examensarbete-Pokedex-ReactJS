import React, {useEffect, useState } from 'react';
import { useRef } from 'react';
import Search from './Search';
import Card from './Card';


function PokemonFetch() {
    //useState hook används som en variabel som kan ändra o uppdateras värde, (reactive)
    let preventDoubleFetch = useRef(false); //react dubbel fetchar av ngn anledning, preventer
    let [searchValue, setSearchValue] = useState('');
    let [filtered, setFiltered] = useState([]);
    let [pokemon, setPokemon] = useState([]);
    let [allPokemon, setAllPokemon] = useState([]);
    const all =  `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;

    const getAll = async () => {
      
      let res = await fetch(all)
      let alldata = await res.json();
      setAllPokemon(alldata.results);
      getSpecificPokemonsInfo(alldata.results);
      
    }
    
    const getSpecificPokemonsInfo = async (result) => {

        result.forEach (async (pokemon) => {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)  //dynamisk länk för att få rätt info fr rätt pokemon
            let data = await response.json();

            setPokemon(currentList => [...currentList, data]);
        })
    }
 
    const searchPokemon = async (searchValue) =>  {

       
        if (searchValue !== '') {
           setSearchValue(searchValue)
        let filteredList = pokemon.filter((item) => {
         
        return item.name.toLowerCase().startsWith(searchValue.toLowerCase()) 
           
        }) 

       setFiltered(filteredList);
       
        } else {
         setFiltered([]); //rensar arrayn on sök fältet är tomt
        }
    }
  
    let onChangeTarget = (e) => searchPokemon(e.target.value);

   useEffect(() => {

    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;
   
    getAll();
    
   }, []); //[] empty or with variables,checking when changing = run function once on first render


   return (
    
    <div className='pokedex-content' >
        <Search 
        onChange = {onChangeTarget}
        />

      <div  className='pokedex-grid'>
        { searchValue.length >= 1 ? (
            filtered.map((p) => {
                return (
               
                     <Card
                     key = {p.id}
                     id = {p.id}
                     name = {p.name}
                     types = {p.types.map((t) => {
                         return(
                             <li key={t.slot}> {t.type.name} {t.slot}  </li>
                         )
                     })}
                     typefirstForColor = {p.types[0].type.name}
                     image = {p.sprites.front_default}
                     weight = {p.weight}
                     height = {p.height}
                     hp = {p.stats[0].base_stat}
                     attack = {p.stats[1].base_stat}
                     abilities = {p.abilities.map((a) => {
                      return(
                         <li key={a.slot}> {a.ability.name} {a.slot} </li>
                      )
                     })}
        
                     />
                )
            })
        ) : <span className='empty-pokedex'>No Pokémon found</span>
        
        }
      </div>
    </div>
   )
}

export default PokemonFetch;