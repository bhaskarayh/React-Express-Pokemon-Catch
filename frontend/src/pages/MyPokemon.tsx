import React, { useState } from "react";
import Table from "../components/Table";
import { usePokemon } from "../context/PokemonContext";

const MyPokemon: React.FC = () => {
  // Define table columns
  const columns = ["myPokemon", "pokemonName", "renameCount"];
  const { caughtPokemons, releasePokemon } = usePokemon();

  return (
    <div className="container mt-3 ">
      <h1>My Pokemons</h1>
      <div className="overflow-x-scroll">
        <Table columns={columns} data={caughtPokemons} />
      </div>
    </div>
  );
};

export default MyPokemon;
