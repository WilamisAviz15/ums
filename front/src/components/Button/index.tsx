import React from "react";

import styles from "./Button.module.scss";

interface CustomStyles {
  [key: string]: string;
}

interface IProps {
  text: string;
  customStyles?: CustomStyles;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, customStyles, onClick, disabled }: IProps) => {
  return (
    <button className={styles.btn} style={customStyles} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
