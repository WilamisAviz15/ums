import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Users.module.scss";

const Users = () => {
  return (
    <div className={styles.users}>
      <Outlet />
    </div>
  );
};

export default Users;
