import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Meals.module.scss";

const Meals = () => {
  return (
    <div className={styles.meals}>
      <Outlet />
    </div>
  );
};

export default Meals;
