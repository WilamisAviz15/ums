import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import styles from "./RolesForm.module.scss";
import rolesService from "../roles.service";
import { RoleInterface } from "../interfaces/role.interface";

const RolesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<RoleInterface>({ name: "" });

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await rolesService.httpGetById(+id);
      setForm(res);
    };

    handleData();
  }, []);

  const createRole = async () => {
    try {
      if (id) {
        const res = await rolesService.httpPut(form);
      } else {
        const res = await rolesService.httpPost(form);
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
        <h1>Perfis de acesso - {id ? "Editar" : "Criar"}</h1>
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
          <Button variant="contained" color="primary" onClick={createRole}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RolesForm;
