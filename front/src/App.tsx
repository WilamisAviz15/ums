import React from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./pages/auth";
import AuthLogin from "./pages/auth/auth-login";
import Header from "./components/header";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Header>
            <Home />
          </Header>
        }
      ></Route>
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<AuthLogin />} />
        {/* <Route path="register" element={<AuthRegister />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
