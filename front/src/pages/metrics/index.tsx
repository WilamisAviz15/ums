import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Metrics.module.scss";
import CardUI from "../../components/card-ui";
import ChartBar from "../../components/chart-bar";

const Metrics = () => {
  const cardStyle = {
    color: "#fff",
    backgroundColor: "#5ea9ff",
    fontFamily: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };
  return (
    <>
      <ChartBar />
      <div className={styles.metrics}>
        <CardUI
          key={1}
          title={"Refeições agendadas para hoje"}
          extraText={
            <span className={styles.extraText}>
              <b>0</b>
            </span>
          }
          customStyles={cardStyle}
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
          customStyles={{ ...cardStyle, backgroundColor: "#43dcbd" }}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
        <CardUI
          key={1}
          title={"Refeições agendadas e não pagas para hoje"}
          extraText={
            <span className={styles.extraText}>
              <b>0</b>
            </span>
          }
          customStyles={{ ...cardStyle, backgroundColor: "#ffc168" }}
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
          customStyles={{ ...cardStyle, backgroundColor: "#ff6e86" }}
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
          customStyles={{ ...cardStyle, backgroundColor: "#b39ddb   " }}
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
          customStyles={{ ...cardStyle, backgroundColor: "#f48fb1   " }}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      </div>
    </>
  );
};

export default Metrics;
