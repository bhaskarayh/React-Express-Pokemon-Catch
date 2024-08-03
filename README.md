# Pokémon App Setup and Running Guide

## Overview

This guide provides instructions for setting up and running the Pokémon app, which includes both the backend and frontend components. The app allows users to view a list of Pokémon, view details of individual Pokémon, and manage their caught Pokémon.

This project using data from [PokeAPI](https://pokeapi.co/)

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed (preferably the latest LTS version).
2. **npm or yarn**: Package managers for managing dependencies.

## Backend Setup

The backend is a REST API built with Express.js and TypeScript. Follow these steps to set it u

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
yarn install
```

### 3. Run the Backend Server

Start the backend server:

```bash
npm run start
```

or

```bash
yarn start
```

The server will start and listen on http://localhost:3000 by default.

### 4. API Documentation

For API Documentation can access on http://localhost:3000/api-docs

## Frontend Setup

The frontend is a React application built with Vite and TypeScript. Follow these steps to set it up:

### 1. Navigate to the Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

Install the required dependencies:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Run the Frontend Development Server

Start the Vite development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

The frontend will start and be accessible at http://localhost:5173 by default.

## Usage

1. Open Your Browser: Navigate to http://localhost:5173 to access the frontend of the application.

2. Pokémon List Page:

   - View a list of Pokémon with their names and images.
   - Click on a Pokémon to view its details.

3. Pokémon Detail Page:

   - See detailed information about the selected Pokémon.
   - Click the "Catch Pokémon" button with a 50% success probability.
   - After catching, provide a nickname and save it.

4. My Pokémon List Page:
   - View a list of all Pokémon you have caught with their nicknames.
     Release or rename Pokémon as needed.

## Additional Information

### Backend Routes

- **GET /api/catch-probability**: Returns a 50% chance of catching a Pokémon.
- **POST /api/release-pokemon**: Releases a Pokémon; returns a prime number if successful.
- **POST /api/rename-pokemon**: Renames a Pokémon with a combination of the original name and Fibonacci sequence.

### Frontend Components

- **PokemonList**: Displays a paginated list of Pokémon.
- **PokemonDetail**: Shows details of a selected Pokémon and allows catching and renaming.
- **NavigationBar**: Provides navigation and a back button.

### Troubleshooting

- **CORS Issues**: Ensure the backend has CORS enabled if you encounter issues with cross-origin requests.
- **Missing Dependencies**: Make sure all dependencies are installed correctly. Run npm install or yarn install to resolve missing packages.
- **Build Errors**: Check for TypeScript or build errors in the console and resolve them as needed.

## Contributing

If you have any improvements or fixes, please contribute by submitting a pull request.
