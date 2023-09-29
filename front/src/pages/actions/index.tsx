import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Actions.module.scss";

const Actions = () => {
  return (
    <div className={styles.actions}>
      <Outlet />
    </div>
  );
};

export default Actions;
