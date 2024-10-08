import React, { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, Rating, TextField, TextareaAutosize } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns-tz";

import styles from "./RatingsForm.module.scss";
import { ScheduleInterface } from "../../schedules/interfaces/schedule.interface";
import ratingsService from "../ratings.service";
import authService from "../../auth/auth.service";
import RatingsList from "../ratings-list";
import { RatingInterface } from "../interfaces/rating.interface";
import { UserInterface } from "../../users/interfaces/user.interface";
import menuMealService from "../../menu-meal/menu-meal.service";

const RatingsForm = () => {
  const [usedUserMeals, setUsedUserMeals] = useState<ScheduleInterface[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<ScheduleInterface | undefined>(undefined);
  const [user, setUser] = useState<any | null>(null);
  const [rating, setRating] = useState<RatingInterface>({ id: 0, createdAt: new Date(), menuMealId: 0, message: "", stars: 0, username: "" });
  const [renderRatingsList, setRenderRatingsList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const subscription = authService.getUser$().subscribe((user: any) => {
      setUser(user);
      if (user?.cpf) {
        getUsedMeals(user);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const formatDate = (date: Date) =>
    format(new Date(date), "dd/MM/yyyy", {
      timeZone: "America/Sao_Paulo",
    });

  const getUsedMeals = async (user: UserInterface) => {
    const res = await ratingsService.httpGetUsedSchedules(user.cpf);
    setUsedUserMeals(res);
  };

  const handleSelectedMeal = (event: React.ChangeEvent<{ value: unknown }>) => {
    const mealId = event.target.value;
    const selectedMeal = usedUserMeals.find((meal) => meal.id === mealId);
    setSelectedMeal(selectedMeal);
    setRenderRatingsList(true);
  };

  const getMenuMealId = async () => {
    const newDate = new Date(selectedMeal?.date!);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = newDate.toLocaleDateString("en-CA", options).replace(/\//g, "-");
    const res = await menuMealService.httpGetByMenuIdAndDate(selectedMeal?.mealId!, formattedDate);
    return res?.id;
  };

  const saveComment = async () => {
    if (!user || !selectedMeal) {
      console.error("User or meal not loaded");
      return;
    }

    const menuMealId = await getMenuMealId();

    const updatedRating: RatingInterface = {
      ...rating,
      username: user.name,
      menuMealId: menuMealId!,
    };

    const res = await ratingsService.httpPost(updatedRating);
    if (res) {
      clearForm();
      setRenderRatingsList(true);
    }
  };

  const clearForm = () => {
    setRating({
      id: 0,
      createdAt: new Date(),
      menuMealId: 0,
      message: "",
      stars: 0,
      username: "",
    });
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
            <article className={styles.rating__stars}>
              <h3>Nota:</h3>
              <Rating
                name="simple-controlled"
                value={rating?.stars}
                onChange={(event, newValue) => {
                  setRating((oldRating) => ({
                    ...oldRating,
                    stars: newValue ?? 1,
                  }));
                }}
              />
            </article>
            <TextareaAutosize
              className={styles.textarea}
              value={rating.message}
              onChange={(e) =>
                setRating((oldRating) => ({
                  ...oldRating,
                  message: e.target.value,
                }))
              }
              minRows={4}
              aria-label="maximum height"
              placeholder="Escreva um comentário."
            />
            <Button variant="contained" color="primary" onClick={saveComment}>
              Salvar comentário
            </Button>
            <RatingsList renderRatingsList={renderRatingsList} setRenderRatingsList={setRenderRatingsList} mealId={selectedMeal.mealId} date={selectedMeal.date} />
          </section>
        )}
      </form>
    </>
  );
};

export default RatingsForm;
