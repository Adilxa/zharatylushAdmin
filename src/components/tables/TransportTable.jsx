import React from "react";
import { TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";

const TransportTable = ({ tid, driver, number, phone }) => (
  <TableCellContainer path={`/transport/${tid}`}>
    <TableCell component="th" scope="row">
      {tid}
    </TableCell>
    <TableCell scope="row">{driver}</TableCell>
    <TableCell scope="row">{number}</TableCell>
    <TableCell scope="row">{phone}</TableCell>
  </TableCellContainer>
);
export default TransportTable;
