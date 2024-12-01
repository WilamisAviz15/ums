import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./pages/auth";
import AuthLogin from "./pages/auth/auth-login";
import Header from "./components/header";
import authService from "./pages/auth/auth.service";
import RouteList from "./routes/route-list";
import { getChildRoutes } from "./routes/child-routes";
import { MenuInterface } from "./pages/menus/interfaces/menu.interface";
import configService from "./pages/config/config.service";
import { ConfigInterface } from "./pages/config/interfaces/config.interface";
import Wizard from "./pages/wizard";
import WizardForm from "./pages/wizard/wizard-form";

function App() {
  const [menus, setMenus] = useState<Partial<MenuInterface>[]>([]);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    loadConfig();
    authService.getUser$().subscribe((user: any) => setUser(user));
    if (user) {
      configService.httpGet().then((config) => {
        if (!config) {
          return;
        }
        const menus = user.menus.filter((menu: MenuInterface) => {
          if (menu.module === "ConfigModule") {
            return true;
          }
          if (menu.module === "ReportsModule") {
            return true;
          }
          const moduleKey = menu.module as keyof ConfigInterface;
          return config[moduleKey];
        });
        setMenus(menus);
      });
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
      <Route path="/wizard" element={<Wizard />}>
        <Route path="" element={<WizardForm />} />
      </Route>
    </Routes>
  );
}

export default App;
