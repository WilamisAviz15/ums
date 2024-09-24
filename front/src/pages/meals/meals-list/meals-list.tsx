import React from "react";

import { MealInterface } from "../interfaces/meal.interface";
import CardUI from "../../../components/card-ui";
import { useNavigate } from "react-router-dom";
import mealsService from "../meals.service";

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
      return data.map((item) => <CardUI key={item.id} title={item.name} onEditClick={() => editMeals(item.id)} onDeleteClick={() => deleteMeals(item.id)} />);
    }
    return null;
  };

  return <>{handleData()}</>;
};

export default MealsRenderList;
