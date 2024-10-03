import React from "react";
import { IconButton, TextField } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

import styles from "./Meals.module.scss";
import { MealInterface } from "../interfaces/meal.interface";
import { SubMealInterface } from "../interfaces/submeal.interface";

interface SubMealFormProps {
  submeals: SubMealInterface[];
  handleInputChangeSubMeal: (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  addSubMeal: () => void;
  removeSubMeal: (index: number) => void;
}

const SubMealForm = ({ submeals, handleInputChangeSubMeal, addSubMeal, removeSubMeal }: SubMealFormProps) => {
  return (
    <section>
      {submeals.map((submeal, index) => (
        <div key={index} className={styles["submeal-form"]}>
          <div className={styles["input-wrapper"]}>
            <TextField fullWidth label="Nome" variant="outlined" name="name" onChange={(e) => handleInputChangeSubMeal(index, e)} value={submeal.name} />
            <TextField fullWidth label="Preço" variant="outlined" name="price" type="number" onChange={(e) => handleInputChangeSubMeal(index, e)} value={submeal.price} />
          </div>
          <div className={styles["actions"]}>
            <IconButton aria-label="add" size="small" onClick={addSubMeal}>
              <AddIcon fontSize="inherit" />
            </IconButton>
            {submeals.length > 1 && (
              <IconButton aria-label="delete" size="small" onClick={() => removeSubMeal(index)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default SubMealForm;
