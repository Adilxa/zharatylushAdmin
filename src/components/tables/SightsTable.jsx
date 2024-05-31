import React, { useState } from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import $api from "../../http/Api";
import { toast } from 'react-toastify';

const Sightstable = ({ ...props }) => {

  const notify = () => toast("Sight Deleted succesfylly");

  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите удалить " + props.title + '?');
    if (res) {
      await $api.delete("sights/" + props.id)
      notify()
      window?.location?.reload()
    }
  };

  console.log(props);



  return (
    <TableCellContainer path={``}>
      <TableCell component="th" scope="row">
        {props.id}
      </TableCell>

      <TableCell scope="row">{props.title}</TableCell>
      <TableCell scope="row">{props.tour.title}</TableCell>



      {/* <TableCell scope="row">{props.location}</TableCell> */}
      {/* <TableCell scope="row">{startDate} - {endDate}</TableCell> */}
      <TableCell scope="row" align="right">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );


};
export default Sightstable;
