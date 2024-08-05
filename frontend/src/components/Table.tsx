import React from "react";
import { showAlert, showConfirmAlert } from "./Alert";
import { renamePokemon as renameAPI } from "../api";
import { usePokemon } from "../context/PokemonContext";

interface TableProps {
  columns: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const { renamePokemon } = usePokemon();

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
      // console.log({ pokemon });
      const getName = await renameAPI(pokemon.myPokemon, pokemon.renameCount);
      // console.log({ rename });

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
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>No</th>
          {columns.map((column, index) => (
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
              <button className="btn btn-danger">Release</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
