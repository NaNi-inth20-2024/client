import React from "react";

import styles from "./styles.module.scss";

type Props = {
    name: string;
    type: "text" | "password" | "email" | "number" | "date" | "search";
    value?: string | number;
    icon?: "search";
    placeholder?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({
    name,
    type,
    value,
    icon,
    placeholder,
    className,
    onChange,
}) => {
    return (
        <div className={`${styles.inputContainer} ${className}`}>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            ></input>
            {icon && <span className="icon">o</span>}
        </div>
    );
};

export default Input;
