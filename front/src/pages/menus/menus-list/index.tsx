import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import styles from "../Menus.module.scss";
import MenusRenderList from "./menu-list";
import { MenuInterface } from "../interfaces/menu.interface";
import menusService from "../menus.service";

const MenusList = () => {
  const [menus, setMenus] = useState<MenuInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getMenus = async () => {
      const res = await menusService.httpGet();
      setMenus(res);
    };
    getMenus();
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.menus__title}>
        <h1>Menus</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.menus__wrapper}>
        <MenusRenderList data={menus} setMenus={setMenus} />
      </div>
    </>
  );
};

export default MenusList;
