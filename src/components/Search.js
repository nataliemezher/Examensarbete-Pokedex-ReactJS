import PokemonFetch from "./PokemonFetch";
import { useState } from "react";

const Search = ({ handleSubmit, onChange}) => {
   
 
    return (

        <div className="searchbar"> 
        <form onSubmit={handleSubmit}>
                <input
                    placeholder="search pokemon..."
                    type="text"
                    onChange= {onChange}
                /> 
            </form>
        </div>
       
    )
}

export default Search