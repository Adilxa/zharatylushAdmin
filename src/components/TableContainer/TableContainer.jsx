import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableWrapper from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { Grid, IconButton, TextField } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { LoadingStatus } from "../../constants/index";
// import TableSkeletons from "../TableSkeletons/TableSkeletons";

const TableContainer = ({
  Header,
  Body,
  isLoading,
  isFilter = false,
  isSearch = false,
}) => {
  const render = () => {
    if (isLoading) {
      return "...Загрузка";
    }
    return (
      <>
        <TableHead sx={(theme) => ({ background: theme.palette.grey[100] })}>
          {Header}
        </TableHead>
        <TableBody>{Body}</TableBody>
      </>
    );
  };
  return (
    <TableWrapper component={Paper}>
      <Grid container alignItems="center" justifyContent="space-between">
        {isSearch && (
          <Grid sx={{ padding: "15px" }}>
            <TextField
              label="Search"
              placeholder="Search..."
              variant="outlined"
              sx={{ width: "250px" }}
              size="small"
            />
          </Grid>
        )}
        <Grid item alignSelf="right" paddingRight={2}>
          {isFilter && (
            <IconButton color="primary">
              <FilterListIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        {render()}
      </Table>
    </TableWrapper>
  );
};

export default TableContainer;
