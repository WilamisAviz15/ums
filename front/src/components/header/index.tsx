import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";
import Button from "../Button";
import logo from "../../assets/logo-ums.png";
import authService from "../../pages/auth/auth.service";

const Header = ({ menus, children }: { menus: any[]; children: JSX.Element }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <img className={styles.img} src={logo} alt="logo do RU" onClick={() => navigate("/inicio")} />
        <button className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
          {menus.map((menu, index) => (
            <Link key={index} to={`/${menu.route}`} onClick={handleMenuClick}>
              {menu.menu}
            </Link>
          ))}
          <li>
            <Link to="/auth/login" onClick={handleMenuClick}>
              <Button
                text={isLogged ? "Sair" : "Login"}
                customStyles={{
                  backgroundColor: "#FFEB3B",
                  borderStyle: "none",
                  borderRadius: "3px",
                  color: "#212121",
                  // width: "100%",
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
