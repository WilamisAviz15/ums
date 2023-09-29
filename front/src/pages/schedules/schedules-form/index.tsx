import React, { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./SchedulesForm.module.scss";
import schedulesService from "../schedules.service";
import { ScheduleInterface } from "../interfaces/schedule.interface";
import { initialForm } from "./options";
import dayjs, { Dayjs } from "dayjs";
import mealsService from "../../meals/meals.service";
import { MealInterface } from "../../meals/interfaces/meal.interface";
import authService from "../../auth/auth.service";

const SchedulesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<ScheduleInterface>(initialForm);
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState("");

  useEffect(() => {
    setForm({
      ...form,
      userId: authService.getUser().id,
    });
    const handleData = async () => {
      if (!id) return;
      const res = await schedulesService.httpGetById(+id);
      setForm(res);
    };

    handleData();
    getMeals();
  }, []);

  const createSchedule = async () => {
    try {
      if (!form) return;
      if (id) {
        const res = await schedulesService.httpPut(form);
      } else {
        const res = await schedulesService.httpPost(form);
      }
      navigate(-1);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // handleOpenSnackbar(error.response?.data["message"], "error");
      }
    }
  };

  function isDayjsObject(obj: unknown): obj is Dayjs {
    return dayjs.isDayjs(obj);
  }

  const getMeals = async () => {
    const meals = await mealsService.httpGet();
    setMeals(meals);
  };

  const handleDateChange = (value: unknown) => {
    if (isDayjsObject(value)) {
      setForm({
        ...form,
        date: value.toDate(),
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectedMeal(event.target.value);
    handleInputChange(event);
  };

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Agendamentos - {id ? "Editar" : "Criar"}</h1>
      </div>
      <form>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className="picker" onChange={(v) => handleDateChange(v)} value={dayjs(form.date)} />
          </LocalizationProvider>
          <TextField
            id="mealId"
            name="mealId"
            value={id ? form.mealId : selectedMeal}
            fullWidth
            select
            label="Tipo de refeição"
            onChange={(v) => handleSelectChange(v)}
          >
            {meals.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={createSchedule}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SchedulesForm;
