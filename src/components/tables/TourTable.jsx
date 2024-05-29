import React, { useState } from "react";
import { IconButton, TableCell } from "@mui/material";
import TableCellContainer from "./TableCellContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import $api from "../../http/Api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';

const TourTable = ({ title, startDate, endDate, isGid, isApprove, isApprovePage, ...props }) => {

  const [approoved, setApprooved] = useState(isApprove)

  console.log({...props});

  const onDelete = async (e) => {
    e.stopPropagation();
    const res = window?.confirm("Вы действительно хотите удалить тур " + title + '?');
    if (res) {
      await $api.delete("tour/" + props.id)
      window?.location?.reload()
    }
  };

  const notify = () => toast("Tour Approoved");

  const onApprove = async (e, id) => {
    console.log(id);
    e.stopPropagation();
  
    try {
      const response = await $api.put(`tour/${id}`, {
      ...props,  
      isApprove: true
      }
      );
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      notify();
      setApprooved(!approoved);
    } catch (error) {
      console.error('Error approving the tour:', error);
      toast.error("Failed to approve the tour. Please try again later.");
    }
  };
  

  if (isGid) {
    return (
      <TableCellContainer path={`/tour/${props.id}`}>
        <TableCell component="th" scope="row">
          {props.id}
        </TableCell>

        <TableCell scope="row">{title}</TableCell>
        <TableCell scope="row">{props.location}</TableCell>
        <TableCell scope="row">{startDate} - {endDate}</TableCell>
        <TableCell scope="row">
          {/* <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton> */}
          {!props.isApprove ? `Not Approved` : `Approved`}
        </TableCell>
      </TableCellContainer>
    );
  } else {
    return (
      <TableCellContainer path={`/tour/${props.id}`}>
        <TableCell component="th" scope="row">
          {props.id}
        </TableCell>

        <TableCell scope="row">{title}</TableCell>
        <TableCell scope="row">{props.location}</TableCell>
        <TableCell scope="row">{startDate} - {endDate}</TableCell>

        <TableCell scope="row">
          {!approoved ? `Not Approved` : `Approved`}
        </TableCell>
        {
          isApprovePage ? approoved ? <TableCell scope="row"></TableCell> : <TableCell scope="row">
            <IconButton onClick={(e) => onApprove(e, props.id)}>
              <CheckCircleIcon />
            </IconButton>
          </TableCell>
            :
            <TableCell scope="row">
              <IconButton onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
        }
      </TableCellContainer>
    );
  }

};
export default TourTable;
