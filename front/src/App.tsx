import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./pages/auth";
import AuthLogin from "./pages/auth/auth-login";
import Header from "./components/header";
import authService from "./pages/auth/auth.service";
import RouteList from "./routes/route-list";
import { getChildRoutes } from "./routes/child-routes";
import { MenuInterface } from "./pages/menus/interfaces/menu.interface";

function App() {
  const [menus, setMenus] = useState<Partial<MenuInterface>[]>([]);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    authService.getUser$().subscribe((user: any) => setUser(user));
    if (user) {
      setMenus(user.menus);
    }
  }, [user]);

  return (
    <Routes>
      {menus ? (
        menus.map((menu, index) => (
          <Route
            key={index}
            path={`/${menu.route}`}
            element={
              <Header menus={menus}>
                <RouteList name={menu.menuKey!} />
              </Header>
            }
          >
            {getChildRoutes(menu)}
          </Route>
        ))
      ) : (
        <></>
      )}
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<AuthLogin />} />
        {/* <Route path="register" element={<AuthRegister />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
