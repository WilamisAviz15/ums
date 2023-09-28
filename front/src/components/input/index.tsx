import styles from "./InputText.module.scss";

interface IProps {
  value: string;
  setValue?: (value: string) => void;
  readonly?: boolean;
  type: "text" | "password";
  placeholder?: string;
}

const InputText = ({ value, setValue, type, placeholder, readonly = false }: IProps) => {
  return readonly ? (
    <input type={type} placeholder={placeholder} value={value} readOnly={true} />
  ) : (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.inputText}
      value={value}
      onChange={(event) => setValue!(event.target.value)}
    />
  );
};

export default InputText;
