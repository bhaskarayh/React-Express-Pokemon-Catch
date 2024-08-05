import axios from "axios";

const backendApiUrl = "http://localhost:3000/api";
const pokeApiUrl = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (offset: number) => {
  const response = await axios.get(
    `${pokeApiUrl}/pokemon?limit=10&offset=${offset}`
  );
  return response.data;
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await axios.get(`${pokeApiUrl}/pokemon/${name}`);
  return response.data;
};

export const getCatchProbability = async () => {
  const response = await axios.get(`${backendApiUrl}/catch-probability`);
  return response.data;
};

export const releasePokemon = async (pokemonId: string) => {
  const response = await axios.post(`${backendApiUrl}/release`, { pokemonId });
  return response.data;
};

export const renamePokemon = async (
  pokemonName: string,
  renameCount: number
) => {
  const splitName = pokemonName.split("-")[0];

  const response = await axios.post(`${backendApiUrl}/rename`, {
    pokemonName: splitName,
    renameCount,
  });
  return response.data;
};
