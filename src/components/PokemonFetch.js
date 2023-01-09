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
    let [nextLoad, setNextLoad] = useState(`https://pokeapi.co/api/v2/pokemon`); //en limit på 9, för att sen kunna nå resterande pokemon +9 osv
    // let [allPokemon, setAll] = useState(`https://pokeapi.co/api/v2/pokemon`);

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
 
    
    
     //search function filter
    const searchPokemon = async (searchValue) =>  {
        
        setSearchValue(searchValue)
       
        if (searchValue !== '') {
            let filtered = pokemon.filter((item) => {
            return item.name.toLowerCase().startsWith(searchValue.toLowerCase()) //object.values=få värdet från object item, join = convert to string
           
            
        })
         setFiltered(filtered);
        
        } 
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();//default action will not occur if cancelable,kmr ej reloada
       
    }
   //onChange function as prop
   let onChangeTarget = (e) => searchPokemon(e.target.value);


   useEffect(() => {

    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;
    // getAllPokemons();
   
    getPokemons();
    // getAll();
    
   }, []); //[] empty or with variables,checking when changing = run function once on first render


   return (
    
    <div className='pokedex-content' >
        <Search 
        handleSubmit = {handleSubmit}
        onChange = {onChangeTarget}
        />
        <div className='pokedex-grid'>
        { searchValue.length >= 1 ? (
            filtered.map((p) => {
                return (
                    <Card
                    id = {p.id}
                    name = {p.name}
                    types = {p.types.map((t) => {
                        return(
                            <li key={t.slot}> {t.type.name}  </li>
                        )
                    })}
        
                    image = {p.sprites.front_default}
                    weight = {p.weight}
                    height = {p.height}
        
                    abilities = {p.abilities.map((a) => {
                     return(
                        <li key={a.slot}> {a.ability.name} </li>
                     )
                    })}
        
                    />
                )
            })
        ) : (pokemon.map((p) => (
            <Card
            id = {p.id}
            name = {p.name}
            types = {p.types.map((t) => {
                return(
                    <li key={t.slot}> {t.type.name}  </li>
                )
            })}

            image = {p.sprites.front_default}
            weight = {p.weight}
            height = {p.height}

            abilities = {p.abilities.map((a) => {
             return(
                <li key={a.slot}> {a.ability.name} </li>
             )
            })}

            />
        ))
        
        )}
    
        {/* onclick kör functionen från början igen, läser om next 9 pokemons från apiet*/}
    </div>
    <div className='load-more'><button onClick={() => getPokemons()}> Load more </button> </div>
    </div>
   )
}

export default PokemonFetch;