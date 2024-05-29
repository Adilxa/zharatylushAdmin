import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import TableContainer from "../../components/TableContainer/TableContainer";
import useTours from "../../hooks/useTours";
import { TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import $api from "../../http/Api";
import TourUserTable from "../../components/tables/TourUsersTable";


function TourDetailPage() {
  const { id } = useParams();
  const { error, isLoading, getTourDetail, tourDetail } = useTours();
  const { isGid } = useAuth()
  const [edit, setEdit] = useState(false)

  const [gettingLoading, setGettingLoading] = useState([])



  const [tourUserList, setTourUserList] = useState();

  // const { getTransports, transports } = useTransports();

  const GetUsersList = useCallback(async () => {

    try {
      await $api.get("booked-tour")
        .then((res) =>
          setTourUserList(res?.data)
        )
    } catch (e) {
      console.log(e);
    }

  }, [])

  const onCLickEdit = () => {
    setEdit(true)
  }

  useEffect(() => {
    getTourDetail(id);
  }, [id]);

  useEffect(() => {
    GetUsersList()
  }, [])

  console.log(tourUserList);

  // useEffect(() => {
  //   getTransports(id);
  // }, []);

  //todo make paid or not 


  const renderTransports = useMemo(() =>
    tourUserList?.filter((el) => el.tour.id == id).map((el) => <TourUserTable key={el.tid} {...el.user} />)
    , [tourUserList]);

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <PageContainer title={"Тур: " + tourDetail.title}>
      <div style={{ position: "absolute", right: "20px", top: "20px" }}>
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
              <TableCell></TableCell>

            </TableRow>
          }
          Body={renderTransports}
        />
      </div>
    </PageContainer>
  );
}

export default TourDetailPage;
