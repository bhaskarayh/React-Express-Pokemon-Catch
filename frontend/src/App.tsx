import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import MyPokemon from "./pages/MyPokemon";
import NavigationBar from "./components/NavigationBar";
import { PokemonProvider } from "./context/PokemonContext";
const App: React.FC = () => {
  return (
    <PokemonProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Detail />} />
          <Route path="/my-pokemon" element={<MyPokemon />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
};

export default App;
