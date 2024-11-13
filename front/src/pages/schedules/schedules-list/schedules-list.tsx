import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardUI from "../../../components/card-ui";
import scheduleService from "../schedules.service";
import styles from "./SchedulesList.module.scss";
import { ScheduleInterface } from "../interfaces/schedule.interface";
import { formatDate } from "../../../shared/utils/utils";
import menuMealService from "../../menu-meal/menu-meal.service";
import { MenuMealInterface } from "../../menu-meal/interfaces/menu-meal.interface";
import ModalInfoPayment from "../../../components/modal-info-payment";

const ScheduleRenderList = ({
  data,
  setSchedules,
}: {
  data: ScheduleInterface[] | undefined;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleInterface[] | undefined>>;
}) => {
  const navigate = useNavigate();
  const [menuMeals, setMenuMeals] = useState<{ [key: number]: MenuMealInterface | null }>({});
  const [openPaymentInfoModal, setOpenPaymentInfoModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    const fetchMenuMeals = async () => {
      if (!data) return;

      const menuMealsMap: { [key: number]: MenuMealInterface | null } = {};
      for (const item of data) {
        if (item.mealId && item.date) {
          const newDate = new Date(item.date);
          const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
          const formattedDate = newDate.toLocaleDateString("en-CA", options).replace(/\//g, "-");

          const response = await menuMealService.httpGetByMenuIdAndDate(item.mealId!, formattedDate);
          if (response) {
            menuMealsMap[item.id!] = response;
          } else {
            menuMealsMap[item.id!] = null;
          }
        }
      }
      setMenuMeals(menuMealsMap);
    };

    fetchMenuMeals();
  }, [data]);

  const editAction = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteAction = async (id: number | undefined) => {
    if (!id) return;
    await scheduleService.httpDelete(id);
    setSchedules((oldSchedules) => oldSchedules?.filter((item) => item.id !== id));
  };

  const changeModal = (item: any) => {
    setSelectedSchedule(item);
    setOpenPaymentInfoModal(true);
  };

  const isUsed = (item: ScheduleInterface) => {
    return item.used ? (
      <CardUI
        key={item.id}
        title={item.meal.name}
        subTitle={formatDate(item.date)}
        customStyles={{ opacity: "0.5" }}
        isDeletable={false}
        extraText={
          <span className={styles.extraText}>
            <span>Usuário: {item.user.name}</span>
            <br />
            <span>Usado?: {item.used ? "Sim" : "Não"}</span>
            {menuMeals && (
              <article>
                <span>{menuMeals[item.id!]?.name}</span>
                <span>{menuMeals[item.id!]?.description}</span>
              </article>
            )}
          </span>
        }
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />
    ) : (
      <>
        <CardUI
          key={item.id}
          title={item.meal.name}
          subTitle={formatDate(item.date)}
          customStyles={{ borderTop: "6px solid rgba(21, 101, 192, 0.9)" }}
          // isPaymentCard={true}
          extraText={
            <span className={styles.extraText}>
              {/* <span>Usuário: {item.user.name}</span>
            <br />
            <span>Usado?: {item.used ? "Sim" : "Não"}</span> */}
              {menuMeals && (
                <article>
                  <h3>Cardapio</h3>
                  <h4>Nome: </h4>
                  <span>{menuMeals[item.id!]?.name}</span>
                  <h4>Descrição:</h4>
                  <span> {menuMeals[item.id!]?.description}</span>
                </article>
              )}
            </span>
          }
          onEditClick={() => editAction(item.id)}
          onDeleteClick={() => deleteAction(item.id)}
          onOpenPaymentModal={() => {}}
          isPaymentCard={true}
        />
        <ModalInfoPayment schedule={selectedSchedule} openModal={openPaymentInfoModal} setOpenModal={setOpenPaymentInfoModal} />
      </>
    );
  };

  return <>{data && Array.isArray(data) ? data.map((item) => isUsed(item)) : null}</>;
};

export default ScheduleRenderList;
