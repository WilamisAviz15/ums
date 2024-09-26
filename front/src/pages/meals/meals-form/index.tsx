import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Switch, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Meals.module.scss";
import { MealInterface } from "../interfaces/meal.interface";
import mealsService from "../meals.service";
import SubMealForm from "./SubMealForm";
import submealsService from "../submeals.service";

const MealsForm = () => {
  const { id } = useParams();
  const [subMealCheck, setSubMealCheck] = React.useState(false);

  const navigate = useNavigate();
  const [form, setForm] = useState<MealInterface>({ name: "", price: "", submeals: [] });

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await mealsService.httpGetById(+id);
      if (res) {
        const submeals = await submealsService.httpGetByMealId(+id);
        res.submeals = submeals;
      }
      setForm(res);
      if (res.submeals.length > 0) {
        setSubMealCheck(true);
      } else {
        setSubMealCheck(false);
      }
    };

    handleData();
  }, [id]);

  const createOrUpdateMeal = async () => {
    try {
      if (!subMealCheck) {
        form.submeals = [];
      }

      if (id) {
        const res = await mealsService.httpPut(form);
        if (res.meal) {
          console.log(form.submeals);
          form.submeals.forEach(async (submeals) => {
            submeals.mealId = res.meal.id;
            if (submeals.id) {
              await submealsService.httpPut(submeals);
            } else {
              await submealsService.httpPost(submeals);
            }
          });
        }
      } else {
        const res = await mealsService.httpPost(form);
        if (res.meal) {
          form.submeals.forEach(async (submeals) => {
            submeals.mealId = res.meal.id;
            await submealsService.httpPost(submeals);
          });
        }
      }
      navigate("/refeicoes", { state: { updated: true } });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // handleOpenSnackbar(error.response?.data["message"], "error");
      }
    }
  };

  const updateMealPrice = (updatedSubMeals: any) => {
    const totalSubMealPrice = updatedSubMeals.reduce((total: number, submeals: any) => {
      return total + parseFloat(submeals.price || "0");
    }, 0);

    setForm((prevForm) => ({
      ...prevForm,
      price: totalSubMealPrice.toFixed(2),
      submeals: updatedSubMeals,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleInputChangeSubMeal = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedSubMeals = [...form.submeals];
    updatedSubMeals[index] = { ...updatedSubMeals[index], [name]: value };
    updateMealPrice(updatedSubMeals);
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSubMealCheck(checked);

    // if (!checked) {
    //   updateMealPrice([]);
    // }

    if (checked && form.submeals.length === 0) {
      setForm((prevForm) => ({
        ...prevForm,
        submeals: [{ name: "", price: "" }],
      }));
    }
  };

  const addSubMeal = () => {
    const updatedSubMeals = [...form.submeals, { name: "", price: "" }];
    updateMealPrice(updatedSubMeals);
  };

  const removeSubMeal = async (index: number) => {
    const submeal = form.submeals[index];

    if (submeal.id) {
      await submealsService.httpDelete(submeal.id);
    }

    const updatedSubMeals = form.submeals?.filter((_, i) => i !== index);
    updateMealPrice(updatedSubMeals);
  };

  return (
    <>
      <div className={styles.title}>
        <IconButton size="small" color="primary" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <h1>Refeições - {id ? "Editar" : "Criar"}</h1>
      </div>
      <form>
        <div>
          <TextField label="Nome" variant="outlined" name="name" onChange={(v) => handleInputChange(v)} value={form.name} />
          <TextField label="Preço" variant="outlined" name="price" type="number" onChange={(v) => handleInputChange(v)} value={form.price} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>SubRefeição:</h3>
            <Switch checked={subMealCheck} onChange={handleChangeSwitch} />
          </div>
          {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
          {subMealCheck && <SubMealForm submeals={form.submeals} handleInputChangeSubMeal={handleInputChangeSubMeal} addSubMeal={addSubMeal} removeSubMeal={removeSubMeal} />}
          <Button variant="contained" color="primary" onClick={createOrUpdateMeal}>
            {id ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default MealsForm;
