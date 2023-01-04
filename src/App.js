
import Navbar from "./components/Navbar";
import PokemonFetch from "./components/PokemonFetch";


function App() {
  return (
    <div className="App">
      <div className="content">
        <Navbar />
        <PokemonFetch />
      </div>
    </div>
  );
}

export default App;
