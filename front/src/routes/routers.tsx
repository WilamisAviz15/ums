import React from "react";

import Actions from "../pages/actions";
import Home from "../pages/home";
import ActionsForm from "../pages/actions/actions-form";
import ActionsList from "../pages/actions/actions-list";

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
      component: <></>,
      child: [],
    },
    {
      name: "profile",
      component: <></>,
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
