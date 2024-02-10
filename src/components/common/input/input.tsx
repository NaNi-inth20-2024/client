import React from "react";

import styles from "./styles.module.scss";

type Props = {
    name: string;
    type: "text" | "password" | "email" | "number" | "date" | "search";
    value?: string | number;
    icon?: "search";
    placeholder?: string;
    className?: string;
    min?: string;
    max?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    istextArea?: boolean;
};

const Input: React.FC<Props> = ({
    name,
    type,
    value,
    icon,
    placeholder,
    className,
    min,
    max,
    onChange,
    istextArea,
}: Props) => {
    return (
        <div
            className={`${styles.inputContainer} ${className ? className : ""}`}
        >
            {istextArea ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    min={min}
                    max={max}
                ></textarea>
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    min={min}
                    max={max}
                ></input>
            )}
            {icon && <span className="icon">o</span>}
        </div>
    );
};

export default Input;
