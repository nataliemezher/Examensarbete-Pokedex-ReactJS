const Navbar = () => {
    return (
        <div className="pokedex-nav"> 
          <div className="pokedex-logo"> <img src={require ("../assets/PokedexLogo.png")} alt="Pokemon-logo" /></div>  

          <div className="searchbar">  
            <input
                placeholder="search pokemon..."
                type="text"
            /> 
           
           </div>
        </div>
    )
}

export default Navbar