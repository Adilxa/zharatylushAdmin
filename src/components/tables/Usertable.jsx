import React from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import $api from "../../http/Api";

const UserTable = ({ title, startDate, endDate, ...props }) => {


  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите удалить тур " + title + '?');
    if (res) {
      await $api.delete("user/" + props.id)
      window?.location?.reload()
    }
  };


  return (
    <TableCellContainer  path={`/user/${props.id}`}>
      <TableCell component="th" scope="row">
        {props.id}
      </TableCell>

      <TableCell scope="row">{title}</TableCell>
      <TableCell scope="row">{props.createDate}</TableCell>
      <TableCell scope="row">{props.country || "not selected"}</TableCell>
      <TableCell scope="row">{props.role}</TableCell>
      <TableCell scope="row">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );
};
export default UserTable;
