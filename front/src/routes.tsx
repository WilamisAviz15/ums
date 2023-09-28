import React from "react";

import Home from "./pages/home";

const MyRoutes = ({ name }: { name: string }) => {
  const components = [
    {
      name: "inicio",
      component: <Home />,
    },
    {
      name: "actions",
      component: <></>,
    },
    {
      name: "menus-group",
      component: <></>,
    },
    {
      name: "menus",
      component: <></>,
    },
    {
      name: "access-profile",
      component: <></>,
    },
    {
      name: "users",
      component: <></>,
    },
    {
      name: "parameters",
      component: <></>,
    },
    {
      name: "schedules",
      component: <></>,
    },
    {
      name: "profile",
      component: <></>,
    },
    {
      name: "menu",
      component: <></>,
    },
  ];

  return components.filter((component) => component.name === name)[0].component;
};

export default MyRoutes;
