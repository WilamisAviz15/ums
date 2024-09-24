import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Ratings.module.scss";

const Ratings = () => {
  return (
    <div className={styles.ratings}>
      <Outlet />
    </div>
  );
};

export default Ratings;
