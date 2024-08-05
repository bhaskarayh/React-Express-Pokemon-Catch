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

      setPokemons(response.results);
      setTotalPages(Math.ceil(response.count / 20));
    };
    loadPokemons();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mb-5" style={{ marginTop: "6em" }}>
      <h1>Pokémon List</h1>
      <div className="row">
        {pokemons.map((pokemon, index) => (
          <div
            className="col-md-3 col-lg-2 mb-4 d-flex align-items-stretch"
            key={pokemon.name}
          >
            <div className="card d-flex justify-content-evenly w-100">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1 + (currentPage - 1) * 10
                }.png`}
                className="card-img-top img-fluid"
                alt={pokemon.name}
              />
              <div className="card-body d-flex flex-column justify-content-end">
                <h5 className="card-title">{pokemon.name.toUpperCase()}</h5>
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
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage - 1 === 0}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage - 1 === 0}
        />

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
                return null;
              }
            })}
          </>
        )}

        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage + 1 === totalPages + 1}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage + 1 === totalPages + 1}
        />
      </Pagination>
    </div>
  );
};

export default PokemonList;
