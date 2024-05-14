import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import TableContainer from "../../components/TableContainer/TableContainer";
import TransportTable from "../../components/tables/TransportTable";
import useTours from "../../hooks/useTours";
import useTransports from "../../hooks/useTransports";
import { TextField } from "@mui/material";
function TourDetailPage() {
  const { id } = useParams();
  const { error, isLoading, getTourDetail, tourDetail } = useTours();
  const [edit, setEdit] = useState(false)
  // const { getTransports, transports } = useTransports();

  const onCLickEdit = () => {
    setEdit(true)
  }

  useEffect(() => {
    getTourDetail(id);
  }, [id]);

  // useEffect(() => {
  //   getTransports(id);
  // }, []);

  // const renderTransports = useMemo(() =>
  //   transports.map((el) => <TransportTable key={el.tid} {...el} />)
  // );

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <PageContainer title={"Тур: " + tourDetail.title}>
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <Button variant="contained" onClick={() => onCLickEdit()}>
          Изменить тур
        </Button>
      </div>
      <div>
        {
          edit ?
            <>
              <TextField id="outlined-basic" label="Tour Name" variant="outlined" />
            </>
            : <>

              <Typography variant="h6">Дата отправления: {tourDetail.startDate}</Typography>
              <Typography variant="h6">Дата прибытия: {tourDetail.endDate}</Typography>
              <Typography variant="h6">
                Стоимость: {tourDetail.price}c
              </Typography></>
        }
        <br />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Пользователи</Typography>
          <Link to={`/transport/create/${id}`}> <Button variant="contained">+ Добавить транспорт</Button></Link>
        </Box>
        <br />
        <TableContainer
          isLoading={false}
          Header={
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Заплатил</TableCell>
              <TableCell>Телефон</TableCell>
            </TableRow>
          }
        // Body={renderTransports}
        />
      </div>
    </PageContainer>
  );
}

export default TourDetailPage;
