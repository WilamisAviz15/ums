import React, { useState } from "react";

import styles from "./Auth.module.scss";
import { Outlet } from "react-router-dom";

const Menus = () => {
  return (
    <div className={styles.menus}>
      <Outlet />
    </div>
  );
};

export default Menus;
