import { Express, Request, Response } from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const doc = {
  openapi: "2.0", // Specify OpenAPI 3.0
  info: {
    title: "Pokemon API",
    description: "Pokemon API by Bhaskara Yudhistira Hoetomo",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000", // Specify the URL of your API
      description: "Development server",
    },
  ],
};

const outputFile = "./data/swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

// const swaggerSpec = swaggerJsdoc(options);
swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("../index"); // Your project's root file
});

export default swaggerAutogen;
