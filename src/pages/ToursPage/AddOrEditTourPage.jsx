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

  const [isLoading, setLoading] = useState(false)



  const [title, setTitle] = useState('')

  const [to, setTo] = useState("")

  const [numberOfpalce , setPalce] = useState(0)

  const [price , setPrice] = useState(0)

  const [start , setStart] = useState('')

  const [end , setEnd] = useState('')

  const [desc , setDesc] = useState('')

  const [img , setImage] = useState(null)


  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange =async (e) => {
    setImage(e.target.files[0]);
    const res = await toBase64(img)
    console.log(res);
  };



  // const renderCities = useMemo(
  //   () =>
  //     cities.map((city) => (
  //       <MenuItem key={city.cid} value={city.id}>
  //         {/* {city.label} */}
  //       </MenuItem>
  //     )),
  //   [cities]
  // );

  return (
    <FormPageContainer
      isLoading={isLoading}
      title={"Создать тур"}>
      <FormContainer>
        <form >
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
                {/* {renderCities} */}
              </Select>
            </FormControl>
            <TextField
              required
              value={numberOfpalce}
              onChange={(e) => setPalce(e.target.value)}
              label="Кол-во мест"
              variant="outlined"
              type="number"
            />
            <TextField
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Цена"
              variant="outlined"
              type="number"
            />
            <TextField
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
              label="Начало поездки"
              variant="outlined"
              type="number"
            />
            <TextField
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              label="Конец поездки"
              variant="outlined"
              type="number"
            />
            <TextField
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              label="Описание"
              variant="outlined"
            />
            <Button variant="outlined">Upload Image</Button>
            <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
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
