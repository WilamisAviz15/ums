import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Meals.module.scss";
import { MealInterface } from "../interfaces/meal.interface";
import mealsService from "../meals.service";

const MealsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<MealInterface>({ name: "" });

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await mealsService.httpGetById(+id);
      setForm(res);
    };

    handleData();
  }, []);

  const createMeal = async () => {
    try {
      if (id) {
        const res = await mealsService.httpPut(form);
      } else {
        const res = await mealsService.httpPost(form);
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
        <h1>Refeições - {id ? "Editar" : "Criar"}</h1>
      </div>
      <form>
        <div>
          <TextField label="Nome" variant="outlined" name="name" onChange={(v) => handleInputChange(v)} value={form.name} />
          <Button variant="contained" color="primary" onClick={createMeal}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MealsForm;
