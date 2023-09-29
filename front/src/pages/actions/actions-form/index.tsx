import React, { useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import styles from "./ActionsForm.module.scss";
import { useNavigate } from "react-router-dom";
import actionsService from "../actions.service";
import { ActionInterface } from "../interfaces/action.interface";
import { AxiosError } from "axios";

const ActionsForm = () => {
  const [form, setForm] = useState<ActionInterface>({ name: "" });
  const navigate = useNavigate();

  const createAction = async () => {
    try {
      const res = await actionsService.httpPost(form);
      navigate(-1);
      console.log(res);
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
        <h1>Ações - criar</h1>
      </div>
      <form>
        <div>
          <TextField label="Nome" variant="outlined" name="name" onChange={(v) => handleInputChange(v)} />
          <Button variant="contained" color="primary" onClick={createAction}>
            Criar
          </Button>
        </div>
      </form>
    </>
  );
};

export default ActionsForm;
