import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface PokemonContextType {
  caughtPokemons: any[];
  addPokemon: (
    myPokemon: string,
    pokemonName: string,
    renameCount: number
  ) => void;
  releasePokemon: (pokemon: any) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "caughtPokemons";

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [caughtPokemons, setCaughtPokemons] = useState<any[]>(() => {
    const savedPokemons = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedPokemons ? JSON.parse(savedPokemons) : [];
  });

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(caughtPokemons));
  }, [caughtPokemons]);

  const addPokemon = (
    myPokemon: string,
    pokemonName: string,
    renameCount: number
  ) => {
    setCaughtPokemons((prev) => [
      ...prev,
      {
        id: uuidv4(),
        myPokemon,
        pokemonName,
        renameCount,
      },
    ]);
  };

  const releasePokemon = (pokemon: any) => {
    setCaughtPokemons((prev) => prev.filter((p) => p !== pokemon));
  };

  return (
    <PokemonContext.Provider
      value={{ caughtPokemons, addPokemon, releasePokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
