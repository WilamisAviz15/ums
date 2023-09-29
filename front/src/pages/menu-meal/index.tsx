import React, { useState } from "react";

import styles from "./MenuMeal.module.scss";
import { Outlet } from "react-router-dom";

const MenuMeal = () => {
  return (
    <div className={styles.menu_meal}>
      <Outlet />
    </div>
  );
};

export default MenuMeal;
