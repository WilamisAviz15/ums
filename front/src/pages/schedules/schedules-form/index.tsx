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
import { verifyVariabilityActive } from "../../../shared/utils/utils";

enum ScheduleType {
  DIARIO = 1,
  SEMANAL = 2,
}

const SchedulesForm = () => {
  const { id } = useParams();
  const [form, setForm] = useState<ScheduleInterface>(initialForm);
  const [meals, setMeals] = useState<MealInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [activeOptions, setActiveOptions] = useState<string[]>([]);
  const [selectedScheduleType, setSelectedScheduleType] = useState<number>(-1);
  const [dateRange, setDateRange] = useState({ startDate: new Date(), endDate: new Date() });

  const navigate = useNavigate();

  useEffect(() => {
    const options = verifyVariabilityActive("ScheduleModule");
    setActiveOptions(options);

    if (id) {
      setActiveOptions(["diario"]);
      setSelectedScheduleType(1);
    }

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
        if (selectedScheduleType === ScheduleType.DIARIO) {
          const res = await schedulesService.httpPost(form);
        } else {
          const { startDate, endDate } = dateRange;
          let currentDate = startDate;
          endDate.setDate(endDate.getDate());

          while (currentDate <= endDate) {
            const formData = { ...form, date: currentDate };
            try {
              const res = await schedulesService.httpPost(formData);
            } catch (error) {
              console.error(`Erro ao enviar para a data: ${currentDate}`, error);
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
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
    const filteredMeals = meals.filter((meal) => meal.mealUserRoles.some((role) => authService.getUser().rolesId.includes(role.roleId)));
    setMeals(filteredMeals);
  };

  const handleDateChange = (value: unknown) => {
    if (isDayjsObject(value)) {
      setForm({
        ...form,
        date: value.toDate(),
      });
    }
  };

  const handleDateRangeChange = (value: unknown, name: "startDate" | "endDate") => {
    if (isDayjsObject(value)) {
      setDateRange((oldDateRange) => ({
        ...oldDateRange,
        [name]: value.toDate(),
      }));
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
          {!id && (
            <div>
              <TextField
                id="scheduleType"
                name="scheduleType"
                value={selectedScheduleType == -1 ? null : selectedScheduleType}
                fullWidth
                select
                label="Tipo de agendamento"
                onChange={(v) => {
                  setSelectedScheduleType(+v.target.value);
                }}
              >
                {activeOptions.includes("diario") && (
                  <MenuItem key="diario" value={ScheduleType.DIARIO}>
                    Diário
                  </MenuItem>
                )}
                {activeOptions.includes("semanal") && (
                  <MenuItem key="semanal" value={ScheduleType.SEMANAL}>
                    Semanal
                  </MenuItem>
                )}
              </TextField>
            </div>
          )}
          {activeOptions.includes("diario") && selectedScheduleType == ScheduleType.DIARIO && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="picker" onChange={(v) => handleDateChange(v)} value={dayjs(form.date)} />
              </LocalizationProvider>
              <TextField id="mealId" name="mealId" value={id ? form.mealId : selectedMeal} fullWidth select label="Tipo de refeição" onChange={(v) => handleSelectChange(v)}>
                {meals.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name + " - R$ " + option.price + " - " + (option.submeals?.map((submeal) => submeal.name).join(", ") || "")}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
          {activeOptions.includes("semanal") && selectedScheduleType == ScheduleType.SEMANAL && (
            <>
              <div className={styles["date-range"]}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Data Inicio" className="picker" onChange={(v) => handleDateRangeChange(v, "startDate")} value={dayjs(dateRange.startDate)} />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Data Fim" className="picker" onChange={(v) => handleDateRangeChange(v, "endDate")} value={dayjs(dateRange.endDate)} />
                </LocalizationProvider>
              </div>
              <TextField id="mealId" name="mealId" value={id ? form.mealId : selectedMeal} fullWidth select label="Tipo de refeição" onChange={(v) => handleSelectChange(v)}>
                {meals.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name + " - R$ " + option.price + " - " + (option.submeals?.map((submeal) => submeal.name).join(", ") || "")}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
          <Button variant="contained" color="primary" onClick={createSchedule}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SchedulesForm;
