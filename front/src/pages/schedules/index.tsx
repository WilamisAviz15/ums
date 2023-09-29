import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Schedules.module.scss";

const Schedules = () => {
  return (
    <div className={styles.schedules}>
      <Outlet />
    </div>
  );
};

export default Schedules;
