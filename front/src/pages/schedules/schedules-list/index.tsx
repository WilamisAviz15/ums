import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { AxiosError } from "axios";
import WarningIcon from "@mui/icons-material/Warning";

import styles from "../Schedules.module.scss";
import schedulesService from "../schedules.service";
import ScheduleRenderList from "./schedules-list";
import { ScheduleInterface } from "../interfaces/schedule.interface";

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ScheduleInterface[]>();
  const navigate = useNavigate();
  useEffect(() => {
    const getSchedules = async () => {
      try {
        const res = await schedulesService.httpGet();
        setSchedules(res);
      } catch (error: any) {
        if (error instanceof AxiosError) {
          console.error(error);
          // handleOpenSnackbar(error.response?.data["message"], "error");
        }
      }
    };
    getSchedules();
  }, []);

  const add = () => {
    navigate("cadastrar");
  };
  return (
    <>
      <div className={styles.schedules__title}>
        <h1>Agendamentos</h1>
        <Fab color="primary" aria-label="add" sx={{ alignSelf: "flex-end" }} onClick={add}>
          <AddIcon />
        </Fab>
      </div>
      <div className={schedules?.length === 0 ? styles.schedules__wrapper2 : styles.schedules__wrapper}>
        {schedules === null ? (
          <p>Carregando agendamentos...</p>
        ) : schedules?.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <WarningIcon style={{ fontSize: "4rem", color: "#4379f2" }} />
            <p style={{ fontSize: "1.2rem", color: "#555" }}>Não há agendamentos cadastrados.</p>
          </div>
        ) : (
          <ScheduleRenderList data={schedules} setSchedules={setSchedules} />
        )}
      </div>
    </>
  );
};

export default ScheduleList;
