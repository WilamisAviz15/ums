import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns-tz";

import CardUI from "../../../components/card-ui";
import styles from "./MenuMeal.module.scss";
import { MenuMealInterface } from "../interfaces/menu-meal.interface";
import menuMealService from "../menu-meal.service";

const MenuMealRenderList = ({
  data,
  setMenuMeal,
}: {
  data: MenuMealInterface[] | undefined;
  setMenuMeal: React.Dispatch<React.SetStateAction<MenuMealInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const editAction = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await menuMealService.httpDelete(id);
    setMenuMeal((olSchedules) => olSchedules?.filter((item) => item.id !== id));
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
          title={item.name}
          subTitle={formatDate(item.date)}
          extraText={
            <span className={styles.extraText}>
              <span> {item.description}</span>
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

export default MenuMealRenderList;
