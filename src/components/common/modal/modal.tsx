import { useState } from "react";
import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
    hidden?: boolean;
};

const Modal: React.FC<Props> = ({ children, hidden = true }: Props) => {
    const [isOpen, setIsOpen] = useState(hidden);

    return (
        <div className={`${styles.modal__backdrop} ${isOpen ? "" : styles.closed}`}>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.close} onClick={() => {
                        setIsOpen(false);
                    }}>
                        x
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
