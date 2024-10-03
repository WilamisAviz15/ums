import React from "react";

import Actions from "../pages/actions";
import Home from "../pages/home";
import ActionsForm from "../pages/actions/actions-form";
import ActionsList from "../pages/actions/actions-list";
import ScheduleList from "../pages/schedules/schedules-list";
import Schedules from "../pages/schedules";
import SchedulesForm from "../pages/schedules/schedules-form";
import Profile from "../pages/profile";
import MenuMeal from "../pages/menu-meal";
import MenuMealList from "../pages/menu-meal/menu-meal-list";
import MenuMealForm from "../pages/menu-meal/menu-meal-form";
import MenusGroup from "../pages/menus-groups";
import MenusGroupsList from "../pages/menus-groups/menu-groups-list";
import MenusGroupsForm from "../pages/menus-groups/menus-groups-form";
import Menus from "../pages/menus";
import MenusList from "../pages/menus/menus-list";
import MenusForm from "../pages/menus/menus-form";
import Roles from "../pages/roles";
import RolesList from "../pages/roles/roles-list";
import RolesForm from "../pages/roles/roles-form";
import Users from "../pages/users";
import UsersList from "../pages/users/users-list";
import UsersForm from "../pages/users/users-form";
import ConfirmMeal from "../pages/confirm-meal";
import ConfirmMealForm from "../pages/confirm-meal/confirm-meal-form";
import Ratings from "../pages/ratings";
import RatingsList from "../pages/ratings/ratings-list";
import RatingsForm from "../pages/ratings/ratings-form";
import Meals from "../pages/meals";
import MealsList from "../pages/meals/meals-list";
import MealsForm from "../pages/meals/meals-form";

const routers = () => {
  const components = [
    {
      name: "inicio",
      component: <Home />,
      child: [],
    },
    {
      name: "actions",
      component: <Actions />,
      child: [
        {
          name: "cadastrar",
          component: <ActionsForm />,
        },
        {
          name: "editar/:id",
          component: <ActionsForm />,
        },
        {
          name: "",
          component: <ActionsList />,
        },
      ],
    },
    {
      name: "menus-group",
      component: <MenusGroup />,
      child: [
        {
          name: "",
          component: <MenusGroupsList />,
        },
        {
          name: "cadastrar",
          component: <MenusGroupsForm />,
        },
        {
          name: "editar/:id",
          component: <MenusGroupsForm />,
        },
      ],
    },
    {
      name: "menus",
      component: <Menus />,
      child: [
        {
          name: "",
          component: <MenusList />,
        },
        {
          name: "cadastrar",
          component: <MenusForm />,
        },
        {
          name: "editar/:id",
          component: <MenusForm />,
        },
      ],
    },
    {
      name: "access-profile",
      component: <Roles />,
      child: [
        {
          name: "",
          component: <RolesList />,
        },
        {
          name: "cadastrar",
          component: <RolesForm />,
        },
        {
          name: "editar/:id",
          component: <RolesForm />,
        },
      ],
    },
    {
      name: "users",
      component: <Users />,
      child: [
        {
          name: "",
          component: <UsersList />,
        },
        {
          name: "cadastrar",
          component: <UsersForm />,
        },
        {
          name: "editar/:id",
          component: <UsersForm />,
        },
      ],
    },
    {
      name: "parameters",
      component: <></>,
      child: [],
    },
    {
      name: "schedules",
      component: <Schedules />,
      child: [
        {
          name: "cadastrar",
          component: <SchedulesForm />,
        },
        {
          name: "editar/:id",
          component: <SchedulesForm />,
        },
        {
          name: "",
          component: <ScheduleList />,
        },
      ],
    },
    {
      name: "profile",
      component: <Profile />,
      child: [],
    },
    {
      name: "menu",
      component: <MenuMeal />,
      child: [
        {
          name: "",
          component: <MenuMealList />,
        },
        {
          name: "cadastrar",
          component: <MenuMealForm />,
        },
        {
          name: "editar/:id",
          component: <MenuMealForm />,
        },
      ],
    },
    {
      name: "confirm-meal",
      component: <ConfirmMeal />,
      child: [
        {
          name: "",
          component: <ConfirmMealForm />,
        },
      ],
    },
    {
      name: "avaliacoes",
      component: <Ratings />,
      child: [
        {
          name: "",
          component: <RatingsForm />,
        },
        // {
        //   name: "cadastrar",
        //   component: <RatingsForm />,
        // },
      ],
    },
    {
      name: "refeicoes",
      component: <Meals />,
      child: [
        {
          name: "",
          component: <MealsList />,
        },
        {
          name: "cadastrar",
          component: <MealsForm />,
        },
        {
          name: "editar/:id",
          component: <MealsForm />,
        },
      ],
    },
  ];
  return components;
};

export default routers;
