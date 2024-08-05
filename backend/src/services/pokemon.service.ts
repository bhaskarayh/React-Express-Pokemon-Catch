import { isPrime } from "./utils.service";

export const getCatchProbability = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const probability = Math.random() * 100;
      resolve(probability);
    }, 500);
  });
};

export const releasePokemon = (pokemonId: string): number | null => {
  const primeNumber = Math.floor(Math.random() * 1000);
  return isPrime(primeNumber) ? primeNumber : null;
};

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
