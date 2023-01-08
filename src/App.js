
import Navbar from "./components/Navbar";
import PokemonFetch from "./components/PokemonFetch";
import Search from "./components/Search";


function App() {
  return (
    <div className="App">
      <div className="content">
        <Navbar />
        {/* <Search/> */}
        <PokemonFetch />
      </div>
    </div>
  );
}

export default App;
