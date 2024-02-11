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
    onChange?: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void;
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
            {icon && (
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
            )}
        </div>
    );
};

export default Input;
