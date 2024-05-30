import React, { useState } from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import $api from "../../http/Api";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { toast } from "react-toastify";
import PersonIcon from '@mui/icons-material/Person';

const UserTable = ({ title, startDate, endDate, ...props }) => {


  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите удалить тур " + title + '?');
    if (res) {
      await $api.delete("user/" + props.id)
        .then(() => {
          toast("Deleted successfully")
        })
      window?.location?.reload()
    }
  };

  const [role, setRole] = useState(props.role)



  const onBeAdmin = async (e) => {
    e.stopPropagation()
    await $api.put("user/" + props.id, { ...props, role: "admin" })
      .then(() => {
        setRole("admin")
        toast(title + " is admin!")
      })
  }

  const onBeGid = async (e) => {
    e.stopPropagation()
    await $api.put("user/" + props.id, { ...props, role: "gid" })
      .then(() => {
        setRole("gid")
        toast(title + " is gid!")
      })
  }

  const onBeUser = async (e) => {
    e.stopPropagation()
    await $api.put("user/" + props.id, { ...props, role: "user" })
      .then(() => {
        setRole("user")
        toast(title + " is user!")
      })
  }


  return (
    <TableCellContainer path={`/user/${props.id}`}>
      <TableCell component="th" scope="row">
        {props.id}
      </TableCell>
      <TableCell scope="row">{title}</TableCell>
      <TableCell scope="row">{props.country || "not selected"}</TableCell>
      <TableCell scope="row">{role}</TableCell>
      <TableCell scope="row">

        <IconButton onClick={(e) => onBeAdmin(e)}>
          <SupervisorAccountIcon color={role == "admin" ? "primary" : ""} />
        </IconButton>
      </TableCell>
      <TableCell scope="row">
        <IconButton onClick={(e) => onBeGid(e)}>
          <PersonSearchIcon color={role == "gid" ? "primary" : ""} />
        </IconButton>
      </TableCell>
      <TableCell scope="row">
        <IconButton onClick={(e) => onBeUser(e)}>
          <PersonIcon color={role == "user" ? "primary" : ""} />
        </IconButton>
      </TableCell>


      <TableCell scope="row">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableCellContainer>
  );
};
export default UserTable;


