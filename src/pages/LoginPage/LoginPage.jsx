// LoginPage.js
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import css from "./LoginPage.module.css";
import { Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
  const [e, setE] = useState("");
  const [p, setP] = useState("");
  const { login } = useAuth();

  const errorToast = () => toast.error("Почта или пароль был введен не верно!");
  const successToast = () => toast.success("Вы успешно вошли в систему!");

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login(e, p);
      successToast();
      window.location.href = "/";
    } catch (error) {
      errorToast();
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <Typography variant="h4">Авторизация c Email и Пароль</Typography>
        <form onSubmit={submit}>
          <TextField
            value={e}
            onChange={(e) => setE(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            value={p}
            onChange={(e) => setP(e.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
          />
    
          <Button type="submit" variant="contained" sx={{ height: 60, marginTop: 2 }}>
            Войти
          </Button>
        </form>
      </div>
      <div className={css.right} />
    </div>
  );
}

export default LoginPage;
