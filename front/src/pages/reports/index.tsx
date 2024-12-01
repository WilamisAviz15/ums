import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Reports.module.scss";

const Reports = () => {
  return (
    <div className={styles.reports}>
      <Outlet />
    </div>
  );
};

export default Reports;
