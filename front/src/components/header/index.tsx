import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "../Button";
import logo from "../../assets/logo-ums.png";

const Header = ({ menus, children }: { menus: any[]; children: JSX.Element }) => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLogged((value) => !value);
    }
  }, []);

  const handleButton = () => {
    if (isLogged) {
      setIsLogged((value) => !value);
      localStorage.clear();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <img src={logo} alt="logo do RU" />
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
