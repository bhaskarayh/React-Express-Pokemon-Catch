import React from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonDetails,
  getCatchProbability,
  renamePokemon,
} from "../api";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = React.useState<any>(null);
  const [nickname, setNickname] = React.useState<string>("");
  const [catchSuccess, setCatchSuccess] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const loadPokemonDetails = async () => {
      const details = await fetchPokemonDetails(name!);
      setPokemon(details);
    };
    loadPokemonDetails();
  }, [name]);

  const handleCatch = async () => {
    const { probability } = await getCatchProbability();
    const success = Math.random() * 100 < probability;
    setCatchSuccess(success);
    if (success) {
      const newName = await renamePokemon(name!, 0); // Example renameCount
      console.log("Caught Pokemon:", newName);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Pokemon Detail: {pokemon?.name.toUpperCase()}</h1>
      {pokemon && (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>Types</h2>
          <ul>
            {pokemon.types.map((typeInfo: any) => (
              <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
            ))}
          </ul>
          <h2>Moves</h2>
          <ul>
            {pokemon.moves.slice(0, 5).map((moveInfo: any) => (
              <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
            ))}
          </ul>
          <button onClick={handleCatch}>Catch Pokemon</button>
          {catchSuccess !== null && (
            <div>
              {catchSuccess ? (
                <div>
                  <p>Pokemon Caught! Give it a nickname:</p>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <button
                    onClick={() => console.log("Pokemon Nicknamed:", nickname)}
                  >
                    Save Nickname
                  </button>
                </div>
              ) : (
                <p>Failed to catch Pokemon.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
