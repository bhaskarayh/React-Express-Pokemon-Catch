import React, { useState } from "react";
import Table from "../components/Table";
import { usePokemon } from "../context/PokemonContext";

const MyPokemon: React.FC = () => {
  const columns = ["myPokemon", "pokemonName", "renameCount"];
  const columnsName = ["My Pokemon", "Pokemon", "Count"];
  const { caughtPokemons, releasePokemon } = usePokemon();

  return (
    <div className="container mb-5" style={{ marginTop: "6em" }}>
      <h1>My Pokemons</h1>
      <div className="overflow-x-scroll">
        <Table
          columns={columns}
          data={caughtPokemons}
          columnsName={columnsName}
        />
      </div>
    </div>
  );
};

export default MyPokemon;
