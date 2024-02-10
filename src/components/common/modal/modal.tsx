import { useState } from "react";
import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
};

const Modal: React.FC<Props> = ({ children, onClose, className }: Props) => {
    return (
        <div className={`${styles.modal__backdrop} ${className}`}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <span className={styles.close} onClick={onClose}>
                        x
                    </span>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
