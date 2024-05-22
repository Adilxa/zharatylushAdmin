import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import $api from "../../http/Api";

const TourUserTable = ({ email, startDate, endDate, ...props }) => {

  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите " + email + '?');
    if (res) {
      await $api.delete("booked-tour/" + props.id)
      window?.location?.reload()
    }
  };


  return (
    <TableCellContainer path={`/tour/${props.id}`}>
      <TableCell component="th" scope="row">
        {props.id}
      </TableCell>

      <TableCell scope="row">{email}</TableCell>
      <TableCell scope="row">{props.cardNumber}</TableCell>
      <TableCell scope="row">{props.createDate}</TableCell>
      <TableCell scope="row">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );
};
export default TourUserTable;
