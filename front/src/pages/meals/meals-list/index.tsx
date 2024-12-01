import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import mealsService from "../meals.service";
import WarningIcon from "@mui/icons-material/Warning";

import styles from "../Meals.module.scss";
import MealsRenderList from "./meals-list";
import { MealInterface } from "../interfaces/meal.interface";
import submealsService from "../submeals.service";

const MealsList = () => {
  const [meals, setMeals] = useState<MealInterface[]>();
  const navigate = useNavigate();
  const location = useLocation();

  const getMeals = async () => {
    const res = await mealsService.httpGet();
    setMeals(res);
  };

  useEffect(() => {
    getMeals();

    if (location.state?.updated) {
      getMeals();
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

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

      <div className={meals?.length === 0 ? styles.meals__wrapper2 : styles.meals__wrapper}>
        {meals === null ? (
          <p>Carregando agendamentos...</p>
        ) : meals?.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <WarningIcon style={{ fontSize: "4rem", color: "#4379f2" }} />
            <p style={{ fontSize: "1.2rem", color: "#555" }}>Não há refeições cadastradas.</p>
          </div>
        ) : (
          <MealsRenderList data={meals} setMeals={setMeals} />
        )}
      </div>
    </>
  );
};

export default MealsList;
