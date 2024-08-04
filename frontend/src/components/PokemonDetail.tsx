import React from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonDetails,
  getCatchProbability,
  renamePokemon,
} from "../api";
import { showAlert } from "./Alert";
import { usePokemon } from "../context/PokemonContext";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = React.useState<any>(null);
  const [nickname, setNickname] = React.useState<string>("");
  const [catchSuccess, setCatchSuccess] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { caughtPokemons, addPokemon } = usePokemon();

  React.useEffect(() => {
    const loadPokemonDetails = async () => {
      const details = await fetchPokemonDetails(name!);
      setPokemon(details);
    };
    loadPokemonDetails();
  }, [name]);

  const handleCatch = async () => {
    setLoading(true);

    const { probability } = await getCatchProbability();
    const success = Math.random() * 100 < probability;
    setCatchSuccess(success);
    if (success) {
      const newName = await renamePokemon(name!, 0); // Example renameCount
      console.log("Caught Pokemon:", newName);

      addPokemon(newName.newName, name, 0);
      await showAlert({
        title: "Success",
        text: `Success catch ${name?.toLocaleUpperCase()} into pokeball`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      await showAlert({
        title: "Failed",
        text: `Failed catch ${name?.toLocaleUpperCase()}, please try again!`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    setLoading(false);
  };

  function capitalizeAndSeparate(str: string, separator: string = " "): string {
    return str
      .split("-") // Split the string into words by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(separator); // Join the words with the specified separator
  }

  return (
    <div className="container mt-4">
      {pokemon && (
        <div className="card">
          <div className="card-img-top d-flex justify-content-center">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
          <div className="card-body">
            <h1 className="card-title">
              Pokemon Detail: {pokemon?.name.toUpperCase()}
            </h1>
            <div className="card-text">
              <h2>Types</h2>
              <ul>
                {pokemon.types.map((typeInfo: any) => (
                  <li key={typeInfo.type.name}>
                    {capitalizeAndSeparate(typeInfo.type.name)}
                  </li>
                ))}
              </ul>
              <h2>Moves</h2>
              <ul>
                {pokemon.moves.slice(0, 5).map((moveInfo: any) => (
                  <li key={moveInfo.move.name}>
                    {capitalizeAndSeparate(moveInfo.move.name)}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={handleCatch}>
                {loading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light mx-5"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <span>Catch Pokemon</span>
                )}
              </button>
              {/* {catchSuccess !== null && loading === false && (
                <div className="mt-3">
                  {catchSuccess ? (
                    <div>
                      <p>Pokemon Caught! Give it a nickname:</p>
                      <div className="input-group d-flex justify-content-between w-sm-100">
                        <input
                          type="text"
                          className="form-control"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                        <button
                          className="btn btn-primary px-4"
                          onClick={() =>
                            console.log("Pokemon Nicknamed:", nickname)
                          }
                        >
                          Save{" "}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>Failed to catch Pokemon.</p>
                  )}
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
