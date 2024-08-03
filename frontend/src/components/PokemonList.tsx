import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonList } from "../api";
import { Pagination } from "react-bootstrap";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const loadPokemons = async () => {
      const offset = (currentPage - 1) * 10;
      const response = await fetchPokemonList(offset);

      //   console.log({ response });
      setPokemons(response.results);
      setTotalPages(Math.ceil(response.count / 20));
    };
    loadPokemons();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //   console.log({ pokemons });
  //   console.log({ totalPages });
  //   console.log({ currentPage });
  //   console.log(1 * ((currentPage - 1) * 10) + 1);

  return (
    <div className="container mt-4">
      <h1>Pokémon List</h1>
      <div className="row">
        {pokemons.map((pokemon, index) => (
          <div className="col-md-3 col-lg-2 mb-4" key={pokemon.name}>
            <div className="card">
              <img
                // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.name}.png`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1 + (currentPage - 1) * 10
                }.png`}
                className="card-img-top img-fluid"
                alt={pokemon.name}
              />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination className="d-flex justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />

        {totalPages > 0 && (
          <>
            {[...Array(totalPages).keys()].map((page) => {
              page += 1;

              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Pagination.Item>
                );
              } else if (page === currentPage - 3 || page === currentPage + 3) {
                return <Pagination.Ellipsis key={page} />;
              } else {
                return null; // Skip rendering if the page number is not needed
              }
            })}
          </>
        )}

        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default PokemonList;
