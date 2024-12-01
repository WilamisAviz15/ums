import React, { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, Rating, TextField, TextareaAutosize } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import styles from "./ReportsForm.module.scss";
import reportsService from "../reports.service";

const ReportsForm = () => {
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleSubmit = async () => {
    const res = await reportsService.httpGetAllReports();
    if (res) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio-agendamentos.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Relatórios do Sistema</h1>
      </div>
      <form className={styles.form}>
        <TextField select label="Selecione o tipo de relatório" variant="outlined" fullWidth>
          <MenuItem key={1} value="1">
            Todas as refeições agendadas
          </MenuItem>
        </TextField>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Baixar
        </Button>
      </form>
    </>
  );
};

export default ReportsForm;
