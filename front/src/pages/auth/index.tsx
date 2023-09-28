import React, { useState } from "react";

import styles from "./Auth.module.scss";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className={styles.login}>
      <Outlet />
    </div>
  );
};

export default Auth;
