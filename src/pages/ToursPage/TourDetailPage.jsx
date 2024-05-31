import { Box, Button, Grid, TableCell, TableRow, Typography, TextField, Select, MenuItem } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import TableContainer from "../../components/TableContainer/TableContainer";
import useTours from "../../hooks/useTours";
import useAuth from "../../hooks/useAuth";
import $api from "../../http/Api";
import TourUserTable from "../../components/tables/TourUsersTable";
import { toast } from "react-toastify";

function TourDetailPage() {
  const { id } = useParams();
  const { error, isLoading, getTourDetail, tourDetail } = useTours();
  const { isGid } = useAuth();
  const [edit, setEdit] = useState(false);

  const [tourUserList, setTourUserList] = useState();
  const [editedTourDetail, setEditedTourDetail] = useState({
    title: '',
    startDate: '',
    endDate: '',
    price: '',
    isApprove: false,
    location: ''
  });

  const GetUsersList = useCallback(async () => {
    try {
      const res = await $api.get("booked-tour");
      setTourUserList(res?.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onCLickEdit = () => {
    setEdit(true);
    setEditedTourDetail({
      title: tourDetail?.title,
      startDate: tourDetail?.startDate,
      endDate: tourDetail?.endDate,
      price: tourDetail?.price,
      isApprove: tourDetail?.isApprove,
      location: tourDetail?.location
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTourDetail((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      await $api.put(`/tour/${id}`, editedTourDetail);
      setEdit(false);
      getTourDetail(id); // Refresh the tour details
      toast("Tour edited successfully");
    } catch (error) {
      console.error("Error saving tour data:", error);
    }
  };

  useEffect(() => {
    getTourDetail(id);
  }, []);

  useEffect(() => {
    GetUsersList();
  }, []);


  const renderTransports = useMemo(
    () =>
      tourUserList?.filter((el) => el.tour.id == id).map((el) => <TourUserTable key={el.id} {...el.user} />),
    [tourUserList]
  );

  console.log(tourDetail);

  if (isLoading) return <Preloader full />;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <PageContainer title={"Тур: " + tourDetail?.title}>
      <Box position="absolute" right="20px" top="20px">
        {edit ? (
          <>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: 10 }}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={onCLickEdit}>
            Изменить тур
          </Button>
        )}
      </Box>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={6}>
          {edit ? (
            <TextField
              fullWidth
              label="Tour Name"
              variant="outlined"
              name="title"
              value={editedTourDetail.title}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="h6">Тур: {tourDetail?.title}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {edit ? (
            <TextField
              fullWidth
              label="Стоимость"
              variant="outlined"
              name="price"
              value={editedTourDetail.price}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="h6">Стоимость: {tourDetail?.price}c</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {edit ? (
            <TextField
              fullWidth
              label="Дата отправления"
              variant="outlined"
              name="startDate"
              value={editedTourDetail.startDate}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="h6">Дата отправления: {tourDetail?.startDate}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {edit ? (
            <TextField
              fullWidth
              label="Дата прибытия"
              variant="outlined"
              name="endDate"
              value={editedTourDetail.endDate}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="h6">Дата окончания: {tourDetail?.endDate}</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {edit ? (
            <TextField
              fullWidth
              label="Местоположение"
              variant="outlined"
              name="location"
              value={editedTourDetail.location}
              onChange={handleChange}
            />
          ) : (
            <Typography variant="h6">Местоположение: {tourDetail?.location}</Typography>
          )}
        </Grid>
        {
          !isGid
          &&
          <Grid item xs={12} md={6}>
            {edit ? (
              <Select
                fullWidth
                label="Approve Status"
                variant="outlined"
                name="isApprove"
                value={editedTourDetail?.isApprove}
                onChange={handleChange}
              >
                <MenuItem value={true}>Approved</MenuItem>
                <MenuItem value={false}>Not Approved</MenuItem>
              </Select>
            ) : (
              <Typography variant="h6">Одобрено: {tourDetail?.isApprove ? "Да" : "Нет"}</Typography>
            )}
          </Grid>
        }
      </Grid>
      <Box mt={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Пользователи</Typography>
          {/* <Link to={`/transport/create/${id}`}>
            <Button variant="contained">+ Добавить транспорт</Button>
          </Link> */}
        </Box>
        <TableContainer
          isLoading={false}
          Header={
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Город</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell></TableCell>
            </TableRow>
          }
          Body={renderTransports}
        />
      </Box>
    </PageContainer>
  );
}

export default TourDetailPage;
