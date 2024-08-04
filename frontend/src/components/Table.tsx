import React from "react";

interface TableProps {
  columns: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
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
              <button className="btn btn-secondary">Rename</button>
              <button className="btn btn-danger">Release</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
