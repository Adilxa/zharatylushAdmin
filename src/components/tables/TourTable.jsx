import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import $api from "../../http/Api";

const TourTable = ({ title, startDate, endDate, ...props }) => {


  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите удалить тур " + title + '?');
    if (res) {
      await $api.delete("tour/" + props.id)
      window?.location?.reload()
    }
  };


  return (
    <TableCellContainer path={`/tour/${props.id}`}>
      <TableCell component="th" scope="row">
        {props.id}
      </TableCell>

      <TableCell scope="row">{title}</TableCell>
      <TableCell scope="row">{props.location}</TableCell>
      <TableCell scope="row">{startDate} - {endDate}</TableCell>
      <TableCell scope="row">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );
};
export default TourTable;
