import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "../Button";
import logo from "../../assets/logo-ums.png";
import authService from "../../pages/auth/auth.service";

const Header = ({ menus, children }: { menus: any[]; children: JSX.Element }) => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLogged((value) => !value);
    }
  }, []);

  const handleButton = () => {
    if (isLogged) {
      setIsLogged((value) => !value);
      authService.logout();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <img className={styles.img} src={logo} alt="logo do RU" onClick={() => navigate("/inicio")} />
        <ul>
          {menus.map((menu, index) => (
            <Link key={index} to={`/${menu.route}`}>
              {menu.menu}
            </Link>
          ))}
          <li>
            <Link to="/auth/login">
              <Button
                text={isLogged ? "Sair" : "Login"}
                customStyles={{
                  backgroundColor: "#FFEB3B",
                  borderStyle: "none",
                  borderRadius: "3px",
                  color: "#212121",
                  width: "100%",
                }}
                onClick={handleButton}
              />
            </Link>
          </li>
        </ul>
      </header>
      {children}
    </>
  );
};

export default Header;
