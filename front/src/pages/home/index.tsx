import React from "react";

import styles from "./Home.module.scss";
import ru from "../../assets/ru.jpg";
import MenuMealTable from "../menu-meal/menu-meal-table";
import authService from "../auth/auth.service";
import Metrics from "../metrics";

const Home = () => {
  const isAdminOrManager = () => {
    const privilege = authService.getUserBiggerPrivilege();
    return privilege === 1 || privilege === 2;
  };

  return (
    <div className={styles.home}>
      <h1>Bem vindo ao Sistema de Agendamento de Refeição de Universidades</h1>
      <h2>Sua universidade: Universidade Federal de Alagoas</h2>
      <h2>Seu usuário: {authService.getUser().name}</h2>
      {isAdminOrManager() && <Metrics />}
      <MenuMealTable />
    </div>
  );
};

export default Home;
