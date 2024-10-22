import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Wizard.module.scss";

const Wizard = () => {
  return (
    <div className={styles.wizard}>
      <Outlet />
    </div>
  );
};

export default Wizard;
