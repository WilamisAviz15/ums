import React from "react";

import styles from "./Home.module.scss";
import ru from "../../assets/ru.jpg";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Bem vindo ao Sistema de Agendamento de Refeição de Universidades</h1>
      <h2>Sua universidade é: Universidade Federal de Alagoas</h2>
      <img src={ru} alt="imagem do ru da ufal" />
    </div>
  );
};

export default Home;
