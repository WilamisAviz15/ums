import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./MenusGroups.module.scss";

const MenusGroup = () => {
  return (
    <div className={styles.menus_groups}>
      <Outlet />
    </div>
  );
};

export default MenusGroup;
