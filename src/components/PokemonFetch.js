import React, {useEffect, useState } from 'react';
import { useRef } from 'react';
import Search from './Search';
import Card from './Card';


function PokemonFetch() {
    //useState hook används som en variabel som kan ändra o uppdateras värde, (reactive)
    let preventDoubleFetch = useRef(false);

    let [searchValue, setSearchValue] = useState('');
    let [filtered, setFiltered] = useState([]);

    
    let [pokemon, setPokemon] = useState([]);
    let [nextLoad, setNextLoad] = useState(`https://pokeapi.co/api/v2/pokemon`); 
    let [allPokemon, setAllPokemon] = useState([]);
    const all =  `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;

    const getPokemons = async () => { //async som Promises, framför funktionsnamn, await i funktionens body

        let response = await fetch(nextLoad);
        let data = await response.json();
        
        setNextLoad(data.next); //next kommer ifrån api:et
        
        getSpecificPokemonsInfo(data.results);
        // console.log(data.results);
       
    }

    const getAll = async () => {
      
      let res = await fetch(all)
      let alldata = await res.json();
      setAllPokemon(alldata.results);
      
    }
    
    const getSpecificPokemonsInfo = async (result) => {
// }
        result.forEach (async (pokemon) => {
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)  //dynamisk länk för att få rätt info fr rätt pokemon
            let data = await response.json();

            setPokemon(currentList => [...currentList, data]);
            
            
        })
     
    }
 
    
    
     //search function filter
    const searchPokemon = async (searchValue) =>  {

       
        if (searchValue !== '') {
           setSearchValue(searchValue)
        let filteredList = allPokemon.filter((item) => {
        return item.name.toLowerCase().startsWith(searchValue.toLowerCase()) //object.values=få värdet från object item, join = convert to string
           
             
        }) 
       setFiltered(filteredList);
        console.log(filteredList);
        // console.log('no')
        } else {
          console.log('f.u')
        }
       
        
        
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();//default action will not occur if cancelable,kmr ej reloada
      
     
    }
  
    let onChangeTarget = (e) => searchPokemon(e.target.value);

    let handleSearchClick = (e) => searchPokemon(e.target.value);

    // let handleSearchClick = (e) => {
    //   e.preventDefault();
    //   searchPokemon(e.target.value);
    //   console.log('clicked')
    // };

   useEffect(() => {

    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;
    // getAllPokemons();
   
    getPokemons();
    getAll();
    
   }, []); //[] empty or with variables,checking when changing = run function once on first render


   return (
    
    <div className='pokedex-content' >
        <Search 
        handleSubmit = {handleSubmit}
        onChange = {onChangeTarget}
        handleSearchClick = {handleSearchClick}
       
        />

        <div  className='pokedex-grid'>



         
        
        { searchValue.length >= 1 ? (
            filtered.map((p) => {
                return (
                  <div key={p.id}><p key={p.name}>{p.name}</p></div>
                    // <Card
                    // key = {p.id}
                    // id = {p.id}
                    // name = {p.name}
                    // types = {p.types.map((t) => {
                    //     return(
                    //         <li key={t.slot}> {t.type.name} {t.slot}  </li>
                    //     )
                    // })}
                    // typefirstForColor = {p.types[0].type.name}
                    // image = {p.sprites.front_default}
                    // weight = {p.weight}
                    // height = {p.height}
                    // hp = {p.stats[0].base_stat}
                    // attack = {p.stats[1].base_stat}
                    // abilities = {p.abilities.map((a) => {
                    //  return(
                    //     <li key={a.slot}> {a.ability.name} {a.slot} </li>
                    //  )
                    // })}
        
                    // />
                )
            })
        ) : <div>No Pokémon found</div>
        
        }
    
        {/* onclick kör functionen från början igen, läser om next 9 pokemons från apiet*/}
    </div>
    <div  className='load-more'><button onClick={() => getPokemons()}> Load more </button> </div>
    </div>
   )
}

export default PokemonFetch;