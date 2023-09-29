import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns-tz";

import CardUI from "../../../components/card-ui";
import scheduleService from "../schedules.service";
import styles from "./SchedulesList.module.scss";
import { ScheduleInterface } from "../interfaces/schedule.interface";

const ScheduleRenderList = ({
  data,
  setSchedules,
}: {
  data: ScheduleInterface[] | undefined;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const editAction = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await scheduleService.httpDelete(id);
    setSchedules((olSchedules) => olSchedules?.filter((item) => item.id !== id));
  };

  const formatDate = (date: Date) =>
    format(new Date(date), "dd/MM/yyyy", {
      timeZone: "America/Sao_Paulo",
    });

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.meal.name}
          subTitle={formatDate(item.date)}
          extraText={
            <span className={styles.extraText}>
              <span>Usuário: {item.user.name}</span>
              <br />
              <span>Usado?: {item.used ? "Sim" : "Não"}</span>
            </span>
          }
          onEditClick={() => editAction(item.id)}
          onDeleteClick={() => deleteAction(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default ScheduleRenderList;
