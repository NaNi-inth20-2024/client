import { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
    classname?: string;
    name: string;
    onClick?: () => void;
};

const Button: FC<Props> = ({ classname, name, onClick }) => (
    <button
        className={`${styles.button} ${classname}`}
        name={name}
        onClick={onClick}
    >
        {name}
    </button>
);

export default Button;
