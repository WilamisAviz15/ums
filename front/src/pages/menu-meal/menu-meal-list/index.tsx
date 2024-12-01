import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import WarningIcon from "@mui/icons-material/Warning";

import styles from "../MenuMeal.module.scss";
import { MenuMealInterface } from "../interfaces/menu-meal.interface";
import menuMealService from "../menu-meal.service";
import MenuMealRenderList from "./menu-meal-list";

const MenuMealList = () => {
  const [menuMeal, setMenuMeal] = useState<MenuMealInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getMenuMeal = async () => {
      const res = await menuMealService.httpGet();
      setMenuMeal(res);
    };
    getMenuMeal();
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.menu_meal__title}>
        <h1>Cardápios</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>

      <div className={menuMeal?.length === 0 ? styles.menu_meal__wrapper2 : styles.menu_meal__wrapper}>
        {menuMeal === null ? (
          <p>Carregando agendamentos...</p>
        ) : menuMeal?.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <WarningIcon style={{ fontSize: "4rem", color: "#4379f2" }} />
            <p style={{ fontSize: "1.2rem", color: "#555" }}>Não há cardápios cadastrados.</p>
          </div>
        ) : (
          <MenuMealRenderList data={menuMeal} setMenuMeal={setMenuMeal} />
        )}
      </div>
    </>
  );
};

export default MenuMealList;
