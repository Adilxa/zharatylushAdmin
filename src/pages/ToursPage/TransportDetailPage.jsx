import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import useTransports from "../../hooks/useTransports";
import MultiDatePicker from "../../components/datePicker/TransportDatePicker";

function TransportDetailPage() {
  const [schedule, setSchedule] = useState([]);
  const { id } = useParams();
  const { getTransportDetail, transportDetail, isLoading, error } =
    useTransports();

  useEffect(() => {
    setSchedule(transportDetail?.schedule?.map((el) => el.toDate()));
  }, [transportDetail]);

  useEffect(() => {
    getTransportDetail(id);
  }, []);

  const handleChange = () => {
    const oldSchedule = transportDetail?.schedule?.map((el) => el.toDate())
    console.log(oldSchedule);
    console.log(schedule);
    const isEqual = JSON.stringify(oldSchedule) === JSON.stringify(schedule)
    console.log(isEqual);
  }

  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <PageContainer title={"Водитель: " + transportDetail.driver}>
      <div>
        <Typography variant="h6">
          Номер машины: {transportDetail.number}
        </Typography>
        <Typography variant="h6">
          Номер телефона: {transportDetail.phone}
        </Typography>

        <MultiDatePicker values={schedule} setValues={setSchedule} />
        <Button onClick={handleChange}>Изменить</Button>
      </div>
    </PageContainer>
  );
}

export default TransportDetailPage;
