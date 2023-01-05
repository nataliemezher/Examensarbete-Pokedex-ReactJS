import Search from "./Search"

const Navbar = () => {
    return (
        <div className="pokedex-nav"> 
          <div className="pokedex-logo"> <img src={require ("../assets/PokedexLogo.png")} alt="Pokemon-logo" /></div>  
          <Search/>
        </div>
    )
}

export default Navbar