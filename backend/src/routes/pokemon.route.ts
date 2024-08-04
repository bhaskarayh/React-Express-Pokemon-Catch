import express, { Request, Response } from "express";
import {
  getCatchProbability,
  releasePokemon,
  renamePokemon,
} from "../services/pokemon.service";

const router = express.Router();

// Route to get catch probability
router.get("/catch-probability", async (req: Request, res: Response) => {
  const probability = await getCatchProbability();
  res.json({ probability });
});

// Route to release a Pokemon
router.post("/release", async (req: Request, res: Response) => {
  const { pokemonId } = req.body;
  const result = await releasePokemon(pokemonId);
  if (result) {
    res.json({ success: true, primeNumber: result });
  } else {
    res.status(400).json({ success: false, message: "Release failed" });
  }
});

// Route to rename a Pokemon
router.post("/rename", async (req: Request, res: Response) => {
  const { pokemonName, renameCount } = req.body;
  const newName = await renamePokemon(pokemonName, renameCount);
  res.json({ newName });
});

// Route to rename a Pokemon
router.post("/rename", async (req: Request, res: Response) => {
  const { pokemonName, renameCount } = req.body;
  const newName = await renamePokemon(pokemonName, renameCount);
  res.json({ newName });
});

export default router;
