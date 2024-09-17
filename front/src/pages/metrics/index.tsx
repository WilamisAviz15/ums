import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Metrics.module.scss";
import CardUI from "../../components/card-ui";

const Metrics = () => {
  return (
    <div className={styles.metrics}>
      <CardUI
        key={1}
        title={"Refeições agendadas para hoje"}
        extraText={
          <span className={styles.extraText}>
            <b>0</b>
          </span>
        }
        iconButton={false}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
      <CardUI
        key={1}
        title={"Refeições agendadas e pagas para hoje"}
        extraText={
          <span className={styles.extraText}>
            <b>0</b>
          </span>
        }
        iconButton={false}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
      <CardUI
        key={1}
        title={"Refeições agendadase e não pagas para hoje"}
        extraText={
          <span className={styles.extraText}>
            <b>0</b>
          </span>
        }
        iconButton={false}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
      <CardUI
        key={1}
        title={"Refeições totais agendadas"}
        extraText={
          <span className={styles.extraText}>
            <b>0</b>
          </span>
        }
        iconButton={false}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
      <CardUI
        key={1}
        title={"Refeições totais agendadas e pagas"}
        extraText={
          <span className={styles.extraText}>
            <b>0</b>
          </span>
        }
        iconButton={false}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
      <CardUI
        key={1}
        title={"Refeições totais agendadas e não pagas"}
        extraText={
          <span className={styles.extraText}>
            <b>0</b>
          </span>
        }
        iconButton={false}
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
    </div>
  );
};

export default Metrics;
