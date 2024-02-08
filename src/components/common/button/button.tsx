import { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
    name: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    classname?: string;
};

const Button: FC<Props> = ({ classname, name, type, onClick }) => (
    <button
        className={`${styles.button} ${classname && styles[classname]}`}
        name={name}
        type={type}
        onClick={onClick}
    >
        {name}
    </button>
);

export default Button;
