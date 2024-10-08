import React, { useEffect, useState } from "react";
import { IconButton, TextField, FormControlLabel, Checkbox, Button, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import styles from "./ConfigForm.module.scss";
import configService from "../config.service";
import { ConfigInterface } from "../interfaces/config.interface";
import authService from "../../auth/auth.service";

const ConfigForm = () => {
  const navigate = useNavigate();
  const [systemName, setSystemName] = useState<string>("");
  const [modules, setModules] = useState<ConfigInterface | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await configService.httpGet();
        setModules(config);
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    loadConfig();
  }, []);

  const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (modules) {
      setModules({
        ...modules,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleSystemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSystemName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modules) {
      configService.httpPut(modules).then((res) => {
        if (res) {
          authService.logout();
          navigate("/auth/login");
          window.location.reload();
          return;
        }
      });
    }
  };

  if (!modules) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Configuração Geral do Sistema</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField label="Nome do Sistema" variant="outlined" fullWidth value={systemName} onChange={handleSystemNameChange} margin="normal" />
        <h3>Selecionar Features</h3>
        <Grid container spacing={2}>
          {Object.keys(modules).map((module) => (
            <Grid item xs={4} key={module}>
              <FormControlLabel
                control={<Checkbox checked={modules[module as keyof ConfigInterface]} onChange={handleModuleChange} name={module} />}
                label={module.replace(/Module$/, "")} // Remove 'Module' do rótulo
              />
            </Grid>
          ))}
        </Grid>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Salvar Configurações
        </Button>
      </form>
    </>
  );
};

export default ConfigForm;
