import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Column from "../columns/Column";
import { StoreContext } from "../../utils/store";

export default function BoardDetails() {
  const { id } = useParams();
  // const [columns, setColumns] = useState([]);
  const { contextColumns, setContextColumns } = useContext(StoreContext);

  useEffect(() => {
    async function getAllColumnsFromBoard(boardId) {
      const response = await axios.get(
        "https://retro-clone-api.herokuapp.com/columns"
      );
      const columns = response.data.filter(
        (column) => column.boardId === boardId
      );
      // setColumns(columns);
      setContextColumns(columns);
    }
    getAllColumnsFromBoard(id);
  }, [id]);

  return (
    <React.Fragment>
      {contextColumns.map((column) => (
        <Column key={column._id} column={column} />
      ))}
      {/* {columns.map((column) => (
        <Column key={column._id} column={column} />
      ))} */}
    </React.Fragment>
  );
}
