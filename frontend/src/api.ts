import axios from "axios";

// Backend API URL
const backendApiUrl = "http://localhost:3000/api";

// PokeAPI URL
const pokeApiUrl = "https://pokeapi.co/api/v2";

// Get list of Pokémon from PokeAPI
export const fetchPokemonList = async (offset: number) => {
  const response = await axios.get(
    `${pokeApiUrl}/pokemon?limit=10&offset=${offset}`
  );
  return response.data;
};

// Get Pokémon details from PokeAPI
export const fetchPokemonDetails = async (name: string) => {
  const response = await axios.get(`${pokeApiUrl}/pokemon/${name}`);
  return response.data;
};

// Get catch probability from backend API
export const getCatchProbability = async () => {
  const response = await axios.get(`${backendApiUrl}/catch-probability`);
  return response.data;
};

// Release Pokémon from backend API
export const releasePokemon = async (pokemonId: string) => {
  const response = await axios.post(`${backendApiUrl}/release`, { pokemonId });
  return response.data;
};

// Rename Pokémon from backend API
export const renamePokemon = async (
  pokemonName: string,
  renameCount: number
) => {
  const response = await axios.post(`${backendApiUrl}/rename`, {
    pokemonName,
    renameCount,
  });
  return response.data;
};
