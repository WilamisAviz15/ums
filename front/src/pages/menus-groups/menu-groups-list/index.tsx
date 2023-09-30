import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import styles from "../MenusGroups.module.scss";
import MenusGroupsRenderList from "./menu-groups-list";
import { MenuGroupInterface } from "../interfaces/menu-group.interface";
import menusGroupsService from "../menus-groups.service";

const MenusGroupsList = () => {
  const [menusGroups, setMenusGroups] = useState<MenuGroupInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getMenusGroups = async () => {
      const res = await menusGroupsService.httpGet();
      setMenusGroups(res);
    };
    getMenusGroups();
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.menus_groups__title}>
        <h1>Grupo de menus</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={styles.menus_groups__wrapper}>
        <MenusGroupsRenderList data={menusGroups} setMenusGroups={setMenusGroups} />
      </div>
    </>
  );
};

export default MenusGroupsList;
