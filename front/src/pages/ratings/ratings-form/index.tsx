import React, { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, Rating, TextField, TextareaAutosize } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { format } from "date-fns-tz";

import styles from "./RatingsForm.module.scss";
import { ScheduleInterface } from "../../schedules/interfaces/schedule.interface";
import ratingsService from "../ratings.service";
import authService from "../../auth/auth.service";
import RatingsList from "../ratings-list";

const RatingsForm = () => {
  const [usedUserMeals, setUsedUserMeals] = useState<ScheduleInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<ScheduleInterface | undefined>(undefined);
  const [comments, setComments] = useState<any[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [rating, setRating] = useState<{ stars: number; message?: string }>({ stars: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    authService.getUser$().subscribe((user: any) => setUser(user));
    getUsedMeals();
  }, [user]);

  const formatDate = (date: Date) =>
    format(new Date(date), "dd/MM/yyyy", {
      timeZone: "America/Sao_Paulo",
    });

  const getUsedMeals = async () => {
    const res = await ratingsService.httpGetUsedSchedules(user?.cpf);
    setUsedUserMeals(res);
  };

  const handleSelectedMeal = (event: React.ChangeEvent<{ value: unknown }>) => {
    const mealId = event.target.value;
    const selectedMeal = usedUserMeals.find((meal) => meal.id === mealId);
    setSelectedMeal(selectedMeal);
  };
  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Avaliações de refeição</h1>
      </div>
      <form>
        <TextField select label="Selecione a refeição" variant="outlined" fullWidth onChange={handleSelectedMeal}>
          {usedUserMeals.map((meals) => (
            <MenuItem key={meals.id} value={meals.id}>
              {meals.meal.name} - {formatDate(meals.date)}
            </MenuItem>
          ))}
        </TextField>
        {selectedMeal && (
          <section className={styles.rating}>
            <div className={styles.rating__stars}>
              <h3>Nota:</h3>
              <Rating
                name="simple-controlled"
                value={rating.stars}
                onChange={(event, newValue) => {
                  setRating({ stars: newValue ?? 1 });
                }}
              />
            </div>
            <TextareaAutosize className={styles.textarea} minRows={4} aria-label="maximum height" placeholder="Escreva um comentário." />
            <Button variant="contained" color="primary" onClick={() => {}}>
              Salvar comentário
            </Button>
            <h2>Comentários ({comments.length})</h2>
            <RatingsList />
          </section>
        )}
      </form>
    </>
  );
};

export default RatingsForm;
