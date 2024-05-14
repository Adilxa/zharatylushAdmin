import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useTours from "../../hooks/useTours";
import useTransports from "../../hooks/useTransports";
import MultiDatePicker from "../../components/datePicker/TransportDatePicker";

function AddOrEditTransportPage() {
  const [driver, setDriver] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [dates, setDates] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [isSending, setSending] = useState(false);

  const [title, setTitle] = useState("Создать новый транспорт");

  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const { tourId } = useParams();

  const { addTransport } = useTransports();
  const { getTourDetail, tourDetail, updateTour } = useTours();

  const navigate = useNavigate();

  useEffect(() => {
    getTourDetail(tourId);
  }, [tourId]);

  useEffect(() => {
    if (paths[2] === "create") {
      setLoading(false);
    } else if (paths[2] === "edit") {
      setTimeout(() => {
        // TODO: get transport data from firebase
        setTitle("Транспорт: Бишкек-Каракол");
      }, 2000);
    }
  }, [paths, setLoading]);

  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    addTransport({
      driver,
      number,
      phone,
      schedule: dates,
      tourId,
      fromId: tourDetail.from.id,
      toId: tourDetail.to.id,
      time,
    })
      .finally(() => {
        setSending(false);
      })
      .then((res) => {
        if (res.id) {
          const arr = tourDetail?.transportList || [];
          updateTour(tourId, {
            transportList: [...arr, res.id],
          }).then(() => {
            toast.success("Транспорт был успешно создан!");
            navigate("/tour/" + tourId);
          });
        }
      });
  };

  return (
    <FormPageContainer isLoading={isLoading} title={title}>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <TextField
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              label="Водитель"
              variant="outlined"
              required
            />
            <TextField
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="Номер машины"
              variant="outlined"
              type="text"
            />
            <TextField
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="Номер телефона"
              variant="outlined"
              type="number"
            />
            <TextField
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Время выезда"
              variant="outlined"
              type="number"
            />
            <div>
              <Typography>Расписание</Typography>
              <MultiDatePicker values={dates} setValues={setDates} />
            </div>
          </div>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </form>
      </FormContainer>
    </FormPageContainer>
  );
}

export default AddOrEditTransportPage;
