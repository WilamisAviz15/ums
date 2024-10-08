import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Config.module.scss";

const Config = () => {
  return (
    <div className={styles.config}>
      <Outlet />
    </div>
  );
};

export default Config;
