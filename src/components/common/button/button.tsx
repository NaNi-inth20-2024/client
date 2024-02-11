import { FC } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

type Props = {
    name: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    classname?: string;
    link?: string;
};

const Button: FC<Props> = ({ classname, name, type, onClick, link }) => (
    <button
        className={`${styles.button} ${classname && classname}`}
        name={name}
        type={type}
        onClick={onClick}
    >
        {link ? <Link to={link}>{name}</Link> : name}
    </button>
);

export default Button;
