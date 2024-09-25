import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";

import styles from "./ConfirmMealForm.module.scss";
import confirmMealService from "../confirm-meal.service";
import ConfirmMealList from "../confirm-meal-list";
import { ScheduleInterface } from "../../schedules/interfaces/schedule.interface";

const ConfirmMealForm = () => {
  const [form, setForm] = useState<{ cpf: string }>({ cpf: "" });
  const [userMeal, setUserMeal] = useState<ScheduleInterface[]>([]);

  const search = async () => {
    try {
      const res = await confirmMealService.httpGet(form.cpf);
      setUserMeal(res);
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
        <h1>Buscar refeição </h1>
      </div>
      <form>
        <div>
          <TextField label="CPF" variant="outlined" name="cpf" onChange={(v) => handleInputChange(v)} value={form.cpf} />
          <Button variant="contained" color="primary" onClick={search}>
            Consultar
          </Button>
        </div>
      </form>
      <ConfirmMealList userMeals={userMeal} setUserMeal={setUserMeal} />
    </>
  );
};

export default ConfirmMealForm;
