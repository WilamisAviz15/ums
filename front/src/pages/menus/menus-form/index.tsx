import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./MenusForm.module.scss";
import menusService from "../menus.service";
import { MenuInterface } from "../interfaces/menu.interface";

const MenusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<MenuInterface>();

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await menusService.httpGetById(+id);
      setForm(res);
    };

    handleData();
  }, []);

  // const createAction = async () => {
  //   try {
  //     if (id) {
  //       const res = await menusService.httpPut(form);
  //     } else {
  //       const res = await menusService.httpPost(form);
  //     }
  //     navigate(-1);
  //   } catch (error: any) {
  //     if (error instanceof AxiosError) {
  //       // handleOpenSnackbar(error.response?.data["message"], "error");
  //     }
  //   }
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });
  // };

  return (
    <>
      {/* <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Ações - {id ? "Editar" : "Criar"}</h1>
      </div>
      <form>
        <div>
          <TextField
            label="Nome"
            variant="outlined"
            name="name"
            onChange={(v) => handleInputChange(v)}
            value={form.name}
          />
          <Button variant="contained" color="primary" onClick={createAction}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form> */}
    </>
  );
};

export default MenusForm;
