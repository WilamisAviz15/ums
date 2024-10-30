import React from "react";

import styles from "./ConfirmMeal.module.scss";
import CardUI from "../../../components/card-ui";
import { ScheduleInterface } from "../../schedules/interfaces/schedule.interface";
import schedulesService from "../../schedules/schedules.service";
import { formatDate } from "../../../shared/utils/utils";
import { ConfirmMealInterface } from "../interfaces/confirm-meal.interface";
import confirmMealService from "../confirm-meal.service";

const ConfirmMealRenderList = ({ data, setUserMeal }: { data: ScheduleInterface[]; setUserMeal: React.Dispatch<React.SetStateAction<ScheduleInterface[]>> }) => {
  const deleteMeal = async (id: number | undefined) => {
    if (!id) return;
    try {
      await schedulesService.httpDelete(id);
      setUserMeal((oldSchedule) => oldSchedule?.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const confirmMeal = async (item: ConfirmMealInterface) => {
    if (!item) return;
    try {
      const id = (await confirmMealService.httpPatch(item)).id;
      setUserMeal((oldSchedule) => oldSchedule?.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data
        .filter((item) => item)
        .map((item) =>
          item.used ? (
            <CardUI
              key={item.id}
              title={item.meal.name}
              subTitle={formatDate(item.date)}
              customStyles={{ borderTop: "6px solid rgba(21, 101, 192, 0.9)", opacity: "0.5" }}
              isDeletable={false}
              extraText={
                <span className={styles.extraText}>
                  <span>Usuário: {item.user.name}</span>
                  <br />
                  <span>Usado?: {item.used ? "Sim" : "Não"}</span>
                </span>
              }
              onEditClick={() => {}}
              onDeleteClick={() => {}}
              onIsManager={() => {}}
            />
          ) : (
            <CardUI
              key={item.id}
              title={item.meal.name}
              subTitle={formatDate(item.date)}
              customStyles={{ borderTop: "6px solid rgba(21, 101, 192, 0.9)" }}
              extraText={
                <span className={styles.extraText}>
                  <span>Usuário: {item.user.name}</span>
                  <br />
                  <span>Usado?: {item.used ? "Sim" : "Não"}</span>
                </span>
              }
              onEditClick={() => {}}
              onDeleteClick={() => deleteMeal(item.id)}
              onIsManager={() =>
                confirmMeal({
                  userId: item.userId,
                  mealId: item.mealId,
                  date: new Date(item.date.toString().split("T")[0]),
                })
              }
            />
          )
        );
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default ConfirmMealRenderList;
