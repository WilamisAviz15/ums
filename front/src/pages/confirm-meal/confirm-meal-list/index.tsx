import React, { useEffect, useState } from "react";

import styles from "../ConfirmMeal.module.scss";
import { ScheduleInterface } from "../../schedules/interfaces/schedule.interface";
import ConfirmMealRenderList from "./confirm-meal-list";

const ConfirmMealList = ({
  userMeals,
  setUserMeal,
}: {
  userMeals: ScheduleInterface[];
  setUserMeal: React.Dispatch<React.SetStateAction<ScheduleInterface[]>>;
}) => {
  return (
    <>
      <div className={styles.confirm_meal__title}>
        <h1>Agendamentos</h1>
      </div>
      <div className={styles.confirm_meal__wrapper}>
        <ConfirmMealRenderList data={userMeals} setUserMeal={setUserMeal} />
      </div>
    </>
  );
};

export default ConfirmMealList;
