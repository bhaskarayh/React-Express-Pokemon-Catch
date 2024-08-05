import React from "react";
import { showAlert, showConfirmAlert } from "./Alert";
import {
  releasePokemon as releaseAPI,
  renamePokemon as renameAPI,
} from "../api";
import { usePokemon } from "../context/PokemonContext";
import "./Table.css";

interface TableProps {
  columns: string[];
  columnsName: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ columns, data, columnsName }) => {
  const { renamePokemon, releasePokemon } = usePokemon();

  const handleRename = async (pokemon: any) => {
    const confirmed = await showConfirmAlert({
      title: "Are you sure?",
      text: `You will not be able to recover this name after rename! `,
      icon: "warning",
      confirmButtonText: "Yes, rename",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    });

    if (confirmed) {
      const getName = await renameAPI(pokemon.myPokemon, pokemon.renameCount);

      const rename = await renamePokemon(pokemon.id, getName.newName!);
      if (getName && rename) {
        await showAlert({
          title: "Success!",
          icon: "success",
          text: "The pokemon name has been successfully renamed.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleRelease = async (pokemon: any) => {
    const confirmed = await showConfirmAlert({
      title: "Are you sure?",
      text: `You will not be able to recover this name after release pokemon! `,
      icon: "warning",
      confirmButtonText: "Yes, release",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    });

    if (confirmed) {
      try {
        const relase = await releaseAPI(pokemon.pokemonName);
        console.log(relase);

        if (relase) {
          const releasePoke = await releasePokemon(pokemon.id);

          await showAlert({
            title: "Success!",
            icon: "success",
            text: "The pokemon name has been successfully release.\nPrimary Number: r",
            confirmButtonText: "OK",
          });
        }
      } catch (err: any) {
        console.log(err.response.data);
        await showAlert({
          title: "Failed!",
          icon: "error",
          text: "The pokemon is failed to release",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="table-container">
      <table className="desktop-table">
        <thead>
          <tr>
            <th>No</th>
            {columnsName.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
              <td className="d-flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleRename(row)}
                >
                  Rename
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRelease(row)}
                >
                  Release
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mobile-list">
        {data.map((row, rowIndex) => (
          <div className="list-item" key={rowIndex}>
            <div className="list-header">
              <span className="item-number">No: {rowIndex + 1}</span>
            </div>
            {columns.map((column, colIndex) => (
              <div className="list-detail" key={colIndex}>
                <strong>{columnsName[colIndex]}:</strong> {row[column]}
              </div>
            ))}
            <div className="list-actions">
              <button
                className="btn btn-secondary"
                onClick={() => handleRename(row)}
              >
                Rename
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRelease(row)}
              >
                Release
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
