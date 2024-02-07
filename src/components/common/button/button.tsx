import { FC } from "react";
import styles from "./styles.module.scss";

type Props = {
    name: string;
    onClick: () => void;
    width?: number | string;
    height?: number | string;
};

const Button: FC<Props> = ({ name, onClick, width, height }) => (
    <button
        className={styles.button}
        name={name}
        onClick={onClick}
        style={{ width, height }}
    >
        {name}
    </button>
);

export default Button;
