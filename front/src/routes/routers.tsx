import React from "react";

import Actions from "../pages/actions";
import Home from "../pages/home";
import ActionsForm from "../pages/actions/actions-form";
import ActionsList from "../pages/actions/actions-list";
import ScheduleList from "../pages/schedules/schedules-list";
import Schedules from "../pages/schedules";
import SchedulesForm from "../pages/schedules/schedules-form";
import Profile from "../pages/profile";
import ProfileForm from "../pages/profile/profile-form";

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
      component: <></>,
      child: [],
    },
    {
      name: "menus",
      component: <></>,
      child: [],
    },
    {
      name: "access-profile",
      component: <></>,
      child: [],
    },
    {
      name: "users",
      component: <></>,
      child: [],
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
      component: <></>,
      child: [],
    },
  ];
  return components;
};

export default routers;
