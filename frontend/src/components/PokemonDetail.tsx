import React from "react";
import { useParams } from "react-router-dom";
import {
  fetchPokemonDetails,
  getCatchProbability,
  renamePokemon,
} from "../api";
import { showAlert } from "./Alert";
import { usePokemon } from "../context/PokemonContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = React.useState<any>(null);
  const [nickname, setNickname] = React.useState<string>("");
  const [catchSuccess, setCatchSuccess] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingCard, setLoadingCard] = React.useState<boolean>(false);
  const { caughtPokemons, addPokemon } = usePokemon();

  React.useEffect(() => {
    const loadPokemonDetails = async () => {
      setLoadingCard(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const details = await fetchPokemonDetails(name!);
        setPokemon(details);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        await showAlert({
          title: "Error",
          text: "Failed to load Pokémon details.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setLoadingCard(false);
      }
    };
    loadPokemonDetails();
  }, [name]);

  const SwalWithReactContent = withReactContent(Swal);

  const handleCatch = async () => {
    setLoading(true);

    const { probability } = await getCatchProbability();
    const success = Math.random() * 100 < probability;
    setCatchSuccess(success);
    if (success) {
      const { value: nickname } = await SwalWithReactContent.fire({
        title: "Success!",
        text: `You caught ${name?.toLocaleUpperCase()}! Enter a nickname for your new Pokémon.`,
        input: "text",
        inputLabel: "Nickname",
        inputPlaceholder: "Enter nickname",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter a nickname!";
          }
          return null;
        },
      });

      if (nickname) {
        const newName = await renamePokemon(nickname!, 0);
        console.log("Caught Pokémon:", newName);

        addPokemon(newName.newName, name!, 0);
        await showAlert({
          title: "Success",
          text: `Successfully caught ${name?.toLocaleUpperCase()} and named it ${nickname}!`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await showAlert({
          title: "Catch Cancelled",
          text: `You chose not to catch ${name?.toLocaleUpperCase()}.`,
          icon: "info",
          confirmButtonText: "OK",
        });
      }
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
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(separator);
  }

  if (loadingCard) {
    return (
      <div className="container mb-5" style={{ marginTop: "6em" }}>
        <div className="card">
          <div className="card-img-top d-flex justify-content-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ marginTop: "20px" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="card-body">
            <h1 className="card-title">
              <div className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </div>
            </h1>
            <div className="card-text">
              <h2>
                <div className="placeholder-glow">
                  <span className="placeholder col-4"></span>
                </div>
              </h2>
              <ul>
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <div className="placeholder-glow">
                      <span className="placeholder col-12"></span>
                    </div>
                  </li>
                ))}
              </ul>
              <h2>
                <div className="placeholder-glow">
                  <span className="placeholder col-4"></span>
                </div>
              </h2>
              <ul>
                {[...Array(5)].map((_, index) => (
                  <li key={index}>
                    <div className="placeholder-glow">
                      <span className="placeholder col-12"></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-5" style={{ marginTop: "6em" }}>
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
