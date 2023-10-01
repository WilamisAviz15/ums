import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./ConfirmMeal.module.scss";

const ConfirmMeal = () => {
  return (
    <div className={styles.confirm_meal}>
      <Outlet />
    </div>
  );
};

export default ConfirmMeal;
