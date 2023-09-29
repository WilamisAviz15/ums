import React, { Fragment } from "react";

import routers from "./routers";

const RouteList = ({ name }: { name: string }) => {
  const components = routers();
  const currentRoute = components.filter((component) => component.name === name);

  return currentRoute[0].component;
};

export default RouteList;
