import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useCities from "../../hooks/useCities";
import useTours from "../../hooks/useTours";

function AddOrEditTourPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stops, setStops] = useState("");
  const [duration, setDuration] = useState(0);

  const [isSending, setSending] = useState(false);

  const [title, setTitle] = useState("Создать новый тур");

  const { pathname } = useLocation();
  const paths = pathname.split("/");

  const { getCities, cities, isLoading, setLoading } = useCities();
  const { addTour, error } = useTours();

  const navigate = useNavigate();

  useEffect(() => {
    getCities();
  }, [getCities]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (paths[2] === "create") {
      setLoading(false);
    } else if (paths[2] === "edit") {
      setTimeout(() => {
        // TODO: get tours data from firebase
        setTitle("Тур: Бишкек-Каракол");
      }, 2000);
    }
  }, [paths, setLoading]);

  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    const f = cities.find((el) => el.id === from);
    const t = cities.find((el) => el.id === to);
    addTour({
      name: f.label + "-" + t.label,
      from: { id: f.id, label: f.label },
      to: { id: t.id, label: t.label },
      info: stops,
      duration,
    })
      .finally(() => {
        setSending(false);
      })
      .then(() => {
        toast.success("Тур был успешно создан!");
        navigate("/");
      });
  };

  const renderCities = useMemo(
    () =>
      cities.map((city) => (
        <MenuItem key={city.cid} value={city.id}>
          {city.label}
        </MenuItem>
      )),
    [cities]
  );

  return (
    <FormPageContainer isLoading={isLoading} title={title}>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <FormControl>
              <InputLabel>Откуда</InputLabel>
              <Select
                required
                value={from}
                label="Откуда"
                onChange={(e) => setFrom(e.target.value)}
              >
                {renderCities}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>Куда</InputLabel>
              <Select
                value={to}
                label="Куда"
                onChange={(e) => setTo(e.target.value)}
                required
              >
                {renderCities}
              </Select>
            </FormControl>
            <TextField
              value={stops}
              onChange={(e) => setStops(e.target.value)}
              label="Остановки"
              variant="outlined"
              required
            />
            <TextField
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              label="Длиткльность поездки"
              variant="outlined"
              type="number"
            />
          </div>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </form>
      </FormContainer>
    </FormPageContainer>
  );
}

export default AddOrEditTourPage;
