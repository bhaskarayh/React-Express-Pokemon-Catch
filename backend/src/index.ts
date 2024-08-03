import express, { Request, Response } from "express";
import swaggerAutogen from "./utils/swagger";
import swaggerDocument from "./data/swagger-output.json";
import swaggerUi from "swagger-ui-express";
import pokemonRoutes from "./routes/pokemon.route";
import setHeaders from "./middleware/setHeaders";

const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", setHeaders, pokemonRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);

  // swaggerDocs(app, port);
  swaggerAutogen();
});
