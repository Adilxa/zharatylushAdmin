import {
  Button,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  ImageListItem
} from "@mui/material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useAuth from "../../hooks/useAuth";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import $api from "../../http/Api";

const popularPlacesIssykKul = [
  {
    name: "Cholpon-Ata",
  },
  {
    name: "Karakol",
  },
  {
    name: "Jeti-Ögüz",
  },
  {
    name: "Barskoon",
  },
  {
    name: "Tamga",
  },
  {
    name: "Bokonbayevo",
  },
  {
    name: "Grigorievka Gorge (Chong-Aksuu)",
  },
  {
    name: "Kaji-Say",
  }
];


function AddOrEditTourPage() {

  const { authData, isLoading } = useAuth()

  const [title, setTitle] = useState('')

  const [to, setTo] = useState("")

  const [numberOfpalce, setPalce] = useState(0)

  const [price, setPrice] = useState(0)

  const [start, setStart] = useState('')

  const [end, setEnd] = useState('')

  const [desc, setDesc] = useState('')

  const [img, setImage] = useState(null)


  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }


  const handleImageChange = async (e) => {
    const res = await toBase64(e.target.files[0])
    setImage(res);
  };

  const data = {
    title: title,
    startDate: formatDate(start),
    endDate: formatDate(end),
    price: Number(price),
    amount: Number(numberOfpalce),
    img: img,
    description: desc,
    location: to,
    isApprove: false,
    user: authData
  }

  const notify = () => toast("Tour saved succesfully!");

  const onSave = async (e ,data) => {
    e.preventDefault()
    try {
      await $api.post("tour", data).then(() => {
        notify()
      })
    }catch (e) {
      console.log(e);
    }
  }

  const renderCities = useMemo(
    () =>
      popularPlacesIssykKul.map((city) => (
        <MenuItem key={city.name} value={city.name}>
          {city.name}
        </MenuItem>
      )),
    [popularPlacesIssykKul]
  );

  return (
    <FormPageContainer
      isLoading={isLoading}
      title={"Создать тур"}>
      <FormContainer>
        <form onSubmit={(e) => onSave(e , data)}>
          <div className="inputs">
            <FormControl>
              <TextField
                required
                value={title}
                label="Название тура"
                onChange={(e) => setTitle(e.target.value)}
              >
                {/* {renderCities} */}
              </TextField>
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
              required
              value={numberOfpalce}
              onChange={(e) => setPalce(e.target.value)}
              label="Кол-во мест"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <TextField
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Цена"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              <DatePicker
                label="Начало поездки"
                value={start}
                onChange={(newValue) => setStart(newValue)}
                renderInput={(params) => <TextField {...params} required variant="outlined" />}
              />
              <DatePicker
                label="Конец поездки"
                value={end}
                onChange={(newValue) => setEnd(newValue)}
                renderInput={(params) => <TextField {...params} required variant="outlined" />}
              />
            </LocalizationProvider>
            <TextField
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              label="Описание"
              rows={2}
              multiline
              fullWidth
              variant="outlined"
            />
            <ImageListItem key={img}>
              <img
                src={`${img}`}
                srcSet={`${img}`}
                alt={""}
                loading="lazy"
              />
            </ImageListItem>

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload-input" >
              <Button sx={{ width: "100%", height: "100%" }} component="span" variant="outlined" >
                Upload Image
              </Button>
            </label>


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
