import { Express, Request, Response } from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const doc = {
  openapi: "2.0",
  info: {
    title: "Pokemon API",
    description: "Pokemon API by Bhaskara Yudhistira Hoetomo",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const outputFile = "./data/swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("../index");
});

export default swaggerAutogen;
