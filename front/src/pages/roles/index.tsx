import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Roles.module.scss";

const Roles = () => {
  return (
    <div className={styles.roles}>
      <Outlet />
    </div>
  );
};

export default Roles;
