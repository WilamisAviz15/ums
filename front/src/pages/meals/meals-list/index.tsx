import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import mealsService from "../meals.service";

import styles from "../Meals.module.scss";
import MealsRenderList from "./meals-list";
import { MealInterface } from "../interfaces/meal.interface";
import submealsService from "../submeals.service";

const MealsList = () => {
  const [meals, setMeals] = useState<MealInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getMeals = async () => {
      const res = await mealsService.httpGet();
      setMeals(res);
    };
    getMeals();
  }, [meals]);

  const add = () => {
    navigate("cadastrar");
  };

  return (
    <>
      <div className={styles.meals__title}>
        <h1>Refeições</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.meals__wrapper}>
        <MealsRenderList data={meals} setMeals={setMeals} />
      </div>
    </>
  );
};

export default MealsList;
