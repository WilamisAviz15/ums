import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  Container,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import wizardService from "../wizard.service";

interface ConfigInterface {
  [key: string]: {
    active: boolean;
    name: string;
    options: { [key: string]: boolean };
  };
}

const initialConfig: ConfigInterface = {
  AuthenticationModule: {
    active: true,
    name: "authentication",
    options: {
      localDB: true,
      googleAPI: false,
    },
  },
  RoleModule: {
    active: true,
    name: "roles",
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
  UserModule: { active: true, name: "users", options: { administrador: true, gestor: true } },
  ScheduleModule: { active: true, name: "schedules", options: { diario: true, semanal: true } },
  MealModule: { active: true, name: "meals", options: { simples: true, multiplo: false } },
  PaymentsModule: { active: true, name: "payments", options: { PIX: true, boleto: false } },
  RatingsModule: { active: true, name: "ratings", options: { form: true, forum: false } },
  MetricsModule: { active: true, name: "metrics", options: { cards: true, chart: true } },
};

const steps = ["Informações do Projeto", "Seleção de Features"];

function Wizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modules, setModules] = useState<ConfigInterface>(initialConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedDatabase(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckboxChange = (moduleKey: string, optionKey: string) => {
    setModules((prevModules) => {
      const updatedModule = {
        ...prevModules[moduleKey],
        options: {
          ...prevModules[moduleKey].options,
          [optionKey]: !prevModules[moduleKey].options[optionKey],
        },
      };

      const allOptionsFalse = Object.values(updatedModule.options).every((option) => option === false);
      updatedModule.active = !allOptionsFalse;

      return {
        ...prevModules,
        [moduleKey]: updatedModule,
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const data = { name: projectName, database: databaseName, selectedModules: modules, selectedDatabase, port, username, password };
    console.log(data);

    try {
      const response = await wizardService.httpPost(data);
      if (response) {
        console.log(response);
      } else {
        throw new Error("Erro ao criar o projeto.");
      }
    } catch (error) {
      console.error("Erro: ", error);
      setError("Erro ao criar o projeto.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField label="Nome do Projeto" value={projectName} onChange={(e) => setProjectName(e.target.value)} fullWidth margin="normal" />
            <TextField label="Nome do Banco de Dados" value={databaseName} onChange={(e) => setDatabaseName(e.target.value)} fullWidth margin="normal" />

            <FormControl fullWidth margin="normal">
              <InputLabel id="select-database-label">Selecione o banco de dados</InputLabel>
              <Select labelId="select-database-label" value={selectedDatabase} onChange={handleSelectChange}>
                <MenuItem value="mysql">MySQL</MenuItem>
                <MenuItem value="postgresql">PostgreSQL</MenuItem>
                <MenuItem value="sqlserver">SQL Server</MenuItem>
                <MenuItem value="sqlite">SQLite</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Porta" value={port} onChange={(e) => setPort(e.target.value)} fullWidth margin="normal" />
            <TextField label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
            <TextField label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
          </div>
        );
      case 1:
        return (
          <Container>
            {Object.keys(modules).map((module) => {
              const moduleKey = module.replace("Module", "");
              const moduleData = modules[module as keyof ConfigInterface];

              if (!moduleData.options || Object.keys(moduleData.options).length === 0) {
                return null;
              }

              return (
                <div key={module}>
                  <FormGroup key={module}>
                    <Typography variant="h6">{moduleKey}</Typography>
                    <Grid container spacing={2}>
                      {Object.keys(moduleData.options).map((optionKey) => (
                        <Grid item xs={6} sm={4} md={3} key={optionKey}>
                          <FormControlLabel
                            control={<Checkbox checked={moduleData.options[optionKey]} onChange={() => handleCheckboxChange(module, optionKey)} />}
                            label={optionKey}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                  <Divider style={{ backgroundColor: "#f3f3f3" }} />
                </div>
              );
            })}
          </Container>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Card style={{ margin: "30px" }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box mt={4}>
            {activeStep === steps.length ? (
              <div>
                {loading ? (
                  <CircularProgress size={60} style={{ margin: "20px", color: "blue" }} />
                ) : (
                  <>
                    {error ? (
                      <Typography color="error">{error}</Typography>
                    ) : (
                      <>
                        <Typography variant="h6" gutterBottom>
                          Projeto Criado com Sucesso!
                        </Typography>
                        <Button onClick={handleSubmit}>Finalizar</Button>
                      </>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div>
                {renderStepContent(activeStep)}
                <Box mt={2} style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Voltar
                  </Button>
                  <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                    {activeStep === steps.length - 1 ? "Concluir" : "Próximo"}
                  </Button>
                </Box>
              </div>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Wizard;
