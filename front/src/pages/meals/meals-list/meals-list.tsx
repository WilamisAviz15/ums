import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

import { MealInterface } from "../interfaces/meal.interface";
import CardUI from "../../../components/card-ui";
import mealsService from "../meals.service";
import styles from "../Meals.module.scss";
import { RoleInterface } from "../../roles/interfaces/role.interface";

const MealsRenderList = ({ data, setMeals }: { data: MealInterface[] | undefined; setMeals: React.Dispatch<React.SetStateAction<MealInterface[] | undefined>> }) => {
  const navigate = useNavigate();
  const [rolesMap, setRolesMap] = useState<{ [key: number]: RoleInterface }>({});

  useEffect(() => {
    if (data) {
      const allUserRoles = data.flatMap((item) => item.mealUserRoles);
      fetchRoles(allUserRoles);
    }
  }, [data]);

  const editMeals = (id: number | undefined) => {
    if (!id) return;
    navigate(`editar/${id}`);
  };

  const deleteMeals = async (id: number | undefined) => {
    if (!id) return;
    await mealsService.httpDelete(id);
    setMeals((oldMealsGroup) => oldMealsGroup?.filter((item) => item.id !== id));
  };

  const findRolesById = async (id: number) => {
    return await mealsService.httpGetRolesById(id);

    // return <Chip className={styles.meal__chips__title} key={role.id} label={role.name} />;
  };

  const fetchRoles = async (mealUserRoles: { roleId: number }[]) => {
    const rolePromises = mealUserRoles.map((meal) => findRolesById(meal.roleId));
    const fetchedRoles = await Promise.all(rolePromises);
    const roles = fetchedRoles.reduce((acc, role) => {
      acc[role.id!] = role;
      return acc;
    }, {} as { [key: number]: RoleInterface });
    setRolesMap((prev) => ({ ...prev, ...roles }));
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
                  <br />
                  <div>
                    <strong>Refeição disponível para os perfis:</strong>
                    <div className={styles.meals__chips}>
                      {item.mealUserRoles.map((meal) => {
                        const role = rolesMap[meal.roleId];
                        return role ? <Chip className={styles.meals__chips__title} label={role.name} key={role.id} /> : null;
                      })}
                    </div>
                  </div>
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
