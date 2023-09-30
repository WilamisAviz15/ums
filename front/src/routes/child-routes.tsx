import { Route } from "react-router-dom";

import routers from "./routers";
import { MenuInterface } from "../pages/menus/interfaces/menu.interface";

export const getChildRoutes = (menu: Partial<MenuInterface>) => {
  const routes = routers();
  const currentRoute = routes.filter((item) => item.name === menu.menuKey)[0];
  return (
    <>
      {currentRoute.child.map((item, key) => (
        <Route key={key} path={item.name} element={item.component} />
      ))}
    </>
  );
};
