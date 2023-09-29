import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./AuthLogin.module.scss";
import InputText from "../../../components/input";
import Button from "../../../components/Button";
import authService from "../auth.service";
import { CartToast } from "../../../components/snackbar";
import { AuthLoginInterface } from "../interfaces/auth-login.interface";
import { SnackbarInterface } from "../../../shared/interfaces/snackbar.interface";
import logo from "../../../assets/logo-ums.png";

const AuthLogin = () => {
  const [user, setUser] = useState<AuthLoginInterface>({ username: "", password: "" });
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({ isOpen: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleOpenSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnackbar({ isOpen: true, message, severity });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ isOpen: false, message: "", severity: "success" });
  };

  const handleSetUsername = (value: string) => {
    setUser((currentUser) => ({
      username: value,
      password: currentUser.password,
    }));
  };

  const handleSetPassword = (value: string) => {
    setUser((currentUser) => ({
      username: currentUser.username,
      password: value,
    }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await authService.login(user);
      navigate("/inicio");
    } catch (error: any) {
      if (error instanceof AxiosError) {
        handleOpenSnackbar(error.response?.data["message"], "error");
      }
    }
  };

  return (
    <>
      <form onSubmit={login} className={styles.login}>
        <div>
          <img src={logo} alt="logo do RU" />
          <InputText
            type="text"
            value={user.username}
            placeholder="CPF"
            setValue={(username: string) => handleSetUsername(username)}
          />
          <InputText
            type="password"
            placeholder="•••••••"
            value={user.password}
            setValue={(password: string) => handleSetPassword(password)}
          />
          <Button
            text="Entrar"
            customStyles={{
              backgroundColor: "#FFEB3B",
              borderStyle: "none",
              borderRadius: "3px",
              color: "#212121",
              width: "100%",
            }}
          />
          <div className={styles.register}>
            <hr />
            <Link to="/auth/register">Cadastre-se</Link>
            <Outlet />
          </div>
        </div>
      </form>
      <CartToast
        open={snackbar.isOpen}
        message={snackbar.message}
        handleClose={handleCloseSnackbar}
        time={10000}
        severity={snackbar.severity}
      />
    </>
  );
};

export default AuthLogin;
