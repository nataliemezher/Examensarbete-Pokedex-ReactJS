
import PokemonFetch from "./components/PokemonFetch";


function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="pokedex-nav"> <img src={require ("./assets/PokedexLogo.png")} alt="Pokemon-logo" /> </div>
        <PokemonFetch />
      </div>
    </div>
  );
}

export default App;
