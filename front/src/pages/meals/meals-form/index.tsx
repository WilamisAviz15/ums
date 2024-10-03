import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ArrowBack } from "@mui/icons-material";
import { Button, Checkbox, IconButton, ListItemText, MenuItem, Switch, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./Meals.module.scss";
import { MealInterface } from "../interfaces/meal.interface";
import mealsService from "../meals.service";
import SubMealForm from "./SubMealForm";
import submealsService from "../submeals.service";
import rolesService from "../../roles/roles.service";
import { RoleInterface } from "../../roles/interfaces/role.interface";
import mealsUserRolesService from "../meals-user-roles.service";

type TMealsUserRoles = "save" | "update";

const MealsForm = () => {
  const { id } = useParams();
  const [subMealCheck, setSubMealCheck] = React.useState(false);
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ id: number }[]>([]);
  const [form, setForm] = useState<MealInterface>({ name: "", price: "", submeals: [], mealUserRoles: [] });

  const navigate = useNavigate();

  useEffect(() => {
    const handleData = async () => {
      if (!id) return;
      const res = await mealsService.httpGetById(+id);
      if (res) {
        const submeals = await submealsService.httpGetByMealId(+id);
        const mealUserRoles = await mealsUserRolesService.httpGetByMealId(+id);
        res.submeals = submeals;
        res.mealUserRoles = mealUserRoles;
        setSelectedRoles([...res.mealUserRoles.map((item) => ({ id: item.roleId }))]);
      }
      setForm(res);
      if (res.submeals.length > 0) {
        setSubMealCheck(true);
      } else {
        setSubMealCheck(false);
      }
    };

    handleData();
    getRoles();
  }, [id]);

  const getRoles = async () => {
    const roles = await rolesService.httpGet();
    setRoles(roles);
  };

  const handleMealUserRoles = async (mealId: number, typeRequest: TMealsUserRoles) => {
    if (selectedRoles.length == 0) return;

    const mealUsersRoles = selectedRoles.map((item) => ({ mealId, roleId: item.id }));

    if (typeRequest == "save") {
      await mealsUserRolesService.httpPost(mealUsersRoles);
    } else {
      await mealsUserRolesService.httpPut(mealId, mealUsersRoles);
    }
  };

  const createOrUpdateMeal = async () => {
    try {
      if (!subMealCheck) {
        form.submeals = [];
      }

      if (id) {
        const res = await mealsService.httpPut(form);
        if (res.meal) {
          handleMealUserRoles(res.meal.id!, "update");
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
          handleMealUserRoles(res.meal.id!, "save");
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

  const getSelectedRoleNames = () => {
    const selectedRoleNames: string[] = [];
    for (const roleId of selectedRoles) {
      const role = roles.find((r) => r.id === roleId.id);
      if (role) {
        selectedRoleNames.push(role.name!);
      }
    }
    return selectedRoleNames.join(", ");
  };

  const getRoleIds = () => selectedRoles.map((role) => role.id);

  const handleChange = (event: any) => {
    setSelectedRoles(() => [...event.target.value.map((val: number) => ({ id: val }))]);
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
          <TextField
            select
            label="Refeição vísivel aos perfis"
            variant="outlined"
            fullWidth
            SelectProps={{
              multiple: true,
              renderValue: () => getSelectedRoleNames(),
              value: getRoleIds(),
              onChange: handleChange,
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                <Checkbox checked={selectedRoles.some((selectedRole) => selectedRole.id === role.id)} />
                <ListItemText primary={role.name} />
              </MenuItem>
            ))}
          </TextField>
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
