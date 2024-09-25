import React from "react";
import { useNavigate } from "react-router-dom";

import { MealInterface } from "../interfaces/meal.interface";
import CardUI from "../../../components/card-ui";
import mealsService from "../meals.service";
import styles from "../Meals.module.scss";

const MealsRenderList = ({ data, setMeals }: { data: MealInterface[] | undefined; setMeals: React.Dispatch<React.SetStateAction<MealInterface[] | undefined>> }) => {
  const navigate = useNavigate();
  const editMeals = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteMeals = async (id: number | undefined) => {
    if (!id) return;
    await mealsService.httpDelete(id);
    setMeals((oldMealsGroup) => oldMealsGroup?.filter((item) => item.id !== id));
  };

  const handleData = () => {
    if (data && Array.isArray(data)) {
      return data.map((item) => (
        <CardUI
          key={item.id}
          title={item.name + " R$ " + item.price}
          customStyles={{ borderTop: "10px solid rgba(21, 101, 192, 0.9)" }}
          extraText={
            <span>
              {item.submeals?.length > 0 && (
                <div>
                  <strong>Itens:</strong>
                  <ul style={{ listStyle: "none" }}>
                    {item.submeals.map((meal, index) => (
                      <li key={index}>{meal.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </span>
          }
          onEditClick={() => editMeals(item.id)}
          onDeleteClick={() => deleteMeals(item.id)}
        />
      ));
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default MealsRenderList;
