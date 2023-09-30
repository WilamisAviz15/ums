import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { AxiosError } from "axios";

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
        setSchedules(res.data);
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
      <div className={styles.schedules__wrapper}>
        <ScheduleRenderList data={schedules} setSchedules={setSchedules} />
      </div>
    </>
  );
};

export default ScheduleList;
