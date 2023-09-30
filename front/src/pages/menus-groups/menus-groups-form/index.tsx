import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./MenusGroupsForm.module.scss";
import { MenuGroupInterface } from "../interfaces/menu-group.interface";
import menusGroupsService from "../menus-groups.service";

const MenusGroupsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<MenuGroupInterface>({ name: "" });

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await menusGroupsService.httpGetById(+id);
      setForm(res);
    };

    handleData();
  }, []);

  const createAction = async () => {
    try {
      if (id) {
        const res = await menusGroupsService.httpPut(form);
      } else {
        const res = await menusGroupsService.httpPost(form);
      }
      navigate(-1);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // handleOpenSnackbar(error.response?.data["message"], "error");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Grupo de menu - {id ? "Editar" : "Criar"}</h1>
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
      </form>
    </>
  );
};

export default MenusGroupsForm;
