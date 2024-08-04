import { isPrime } from "./utils.service";

// Generate a 50% probability for catching Pokemon
export const getCatchProbability = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const probability = Math.random() * 100;
      resolve(probability);
    }, 500); // 3000 milliseconds = 3 seconds
  });
};

// Release a Pokemon and return a prime number if successful
export const releasePokemon = (pokemonId: string): number | null => {
  const primeNumber = Math.floor(Math.random() * 1000);
  return isPrime(primeNumber) ? primeNumber : null;
};

// Rename Pokemon with Fibonacci sequence
export const renamePokemon = (name: string, renameCount: number): string => {
  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    let a = 0,
      b = 1,
      c = 0;
    for (let i = 2; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
    }
    return c;
  };

  return `${name}-${fibonacci(renameCount)}`;
};
