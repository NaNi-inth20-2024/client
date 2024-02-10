import styles from "./styles.module.scss";

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    visible: boolean;
};

const Modal: React.FC<Props> = ({ children, onClose, visible }: Props) => {
    return (
        <div className={`${styles.modal__backdrop} ${visible ? "" : styles.closed}`}>
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
