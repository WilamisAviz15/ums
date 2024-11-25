import React, { useEffect, useState } from "react";
import { IconButton, TextField, FormControlLabel, Checkbox, Button, Grid, Container, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import styles from "./ConfigForm.module.scss";
import configService from "../config.service";
import { ConfigInterface } from "../interfaces/config.interface";
import authService from "../../auth/auth.service";
import ConfigCheckbox from "../../../components/config-checkbox";

const initialConfig: ConfigInterface = {
  AuthenticationModule: {
    active: true,
    options: {
      localDB: true,
      googleAPI: false,
    },
  },
  RoleModule: {
    active: true,
    options: {
      administrador: true,
      graduacao: true,
      posGraduacao: true,
      gestor: true,
      servidor: true,
      terceirizado: true,
      visitante: true,
      residente: true,
    },
  },
  // Adicione os outros módulos aqui...
  UserModule: { active: true, options: { admin: true, manager: false, student: true, employee: false, visitor: false } },
  UserRoleModule: { active: true, options: {} },
  ScheduleModule: { active: true, options: { diario: true, semanal: true } },
  ActionModule: { active: true, options: {} },
  MenuModule: { active: true, options: {} },
  MenuGroupModule: { active: true, options: {} },
  MealModule: { active: true, options: { simples: true, multiplo: false } },
  ProfileModule: { active: true, options: {} },
  MenuMealModule: { active: true, options: {} },
  RatingModule: { active: true, options: { forum: true, form: false } },
  SubMealsModule: { active: true, options: {} },
  MealsUserRolesModule: { active: true, options: {} },
  PaymentsModule: { active: true, options: { PIX: true, boleto: false } },
};

const ConfigForm = () => {
  const navigate = useNavigate();
  const [systemName, setSystemName] = useState<string>("");
  const [modules, setModules] = useState<ConfigInterface>();

  const handleCheckboxChange = (moduleKey: string, optionKey?: string) => {
    setModules((prevConfig) => {
      const newConfig = { ...prevConfig };

      if (optionKey) {
        moduleKey = moduleKey.concat("Module");
        if (newConfig[moduleKey].options) {
          newConfig[moduleKey].options[optionKey] = !newConfig[moduleKey].options[optionKey];
        }
      } else {
        moduleKey = moduleKey.concat("Module");
        newConfig[moduleKey].active = !newConfig[moduleKey].active;
      }

      return newConfig;
    });
  };

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await configService.httpGet();
        console.log(config);
        setModules(config);
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    loadConfig();
  }, []);

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
        {/* <TextField label="Nome do Sistema" variant="outlined" fullWidth value={systemName} onChange={handleSystemNameChange} margin="normal" /> */}
        <h3>Selecionar Features</h3>
        <Container>
          {Object.keys(modules).map((module) => {
            const moduleKey = module.replace("Module", "");
            const moduleData = modules[module as keyof ConfigInterface];

            if (!moduleData.options || Object.keys(moduleData.options).length === 0) {
              return null;
            }

            return (
              <ConfigCheckbox
                key={module}
                label={moduleKey}
                active={moduleData.active}
                options={moduleData.options}
                onChange={(optionKey) => handleCheckboxChange(moduleKey, optionKey)}
              />
            );
          })}
        </Container>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Salvar Configurações
        </Button>
      </form>
    </>
  );
};

export default ConfigForm;
