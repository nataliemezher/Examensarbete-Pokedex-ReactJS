import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Search from "./Search";
import Card from "./Card";

function PokemonFetch() {
  //useState hook används som en variabel som kan ändra o uppdateras värde, (reactive)
  let preventDoubleFetch = useRef(false); //react dubbel fetchar av ngn anledning, preventer
  let [searchValue, setSearchValue] = useState("");
  let [filtered, setFiltered] = useState([]);
  let [pokemon, setPokemon] = useState([]);
  let [pokemonInfoByPage, setPokemonInfoByPage] = useState([]);
  let [nextLoad, setNextLoad] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=9`
  );
  let [loading, setLoading] = useState(true);
  const all = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;

  const getPokemonByPage = async () => {
    let res = await fetch(nextLoad);
    let data = await res.json();
    setNextLoad(data.next);
    getPokemonInfoByPage(data.results);
    setLoading(false);
  };

  const getPokemonInfoByPage = async (result) => {
    result.forEach(async (pokemonInfoByPage) => {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonInfoByPage.name}`
      ); //dynamisk länk för att få rätt info fr rätt pokemon
      let data = await response.json();
      setPokemonInfoByPage((currentList) => [...currentList, data]);
    });
  };

  const getAll = async () => {
    let res = await fetch(all);
    let alldata = await res.json();

    getSpecificPokemonsInfo(alldata.results);
    setLoading(false);
  };

  const getSpecificPokemonsInfo = async (result) => {
    result.forEach(async (pokemon) => {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      ); //dynamisk länk för att få rätt info fr rätt pokemon
      let data = await response.json();
      setPokemon((currentList) => [...currentList, data]);
    });
  };

  const searchPokemon = async (searchValue) => {
    setSearchValue(searchValue);

    if (searchValue !== "") {
      let filteredList = pokemon.filter((item) => {
        return item.name.toLowerCase().startsWith(searchValue.toLowerCase());
      });

      setFiltered(filteredList);
    } else {
      setFiltered([]); //rensar arrayn on sök fältet är tomt
    }
  };

  let onChangeTarget = (e) => searchPokemon(e.target.value);

  useEffect(() => {
    if (preventDoubleFetch.current) return;
    preventDoubleFetch.current = true;

    getAll();
    getPokemonByPage();
  }, []); //[] empty or with variables,checking when changing = run function once on first render

  return (
    <div className="pokedex-content">
      <Search onChange={onChangeTarget} />
      <div className="try-search">Try searching!</div>
      <div className="pokedex-grid">
        {loading ? (
          <div className="loading-screen"> LOADING . . .</div>
        ) : searchValue.length >= 1 ? (
          filtered.map((p) => {
            return (
              <Card  key={p.id} p={p} />
            );
          })
        ) : (
          pokemonInfoByPage.map((p) => {
            return (
              <Card key={p.id} p={p} />
            );
          })
        )}
      </div>
      <div className="load-more">
        <button onClick={() => getPokemonByPage()}> Load more </button>{" "}
      </div>
    </div>
  );
}

export default PokemonFetch;
