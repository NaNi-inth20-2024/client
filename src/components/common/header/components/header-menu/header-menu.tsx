import { FC } from "react";
import Button from "../../../button/button";

import styles from "./styles.module.scss";

type Props = {
    onLogout: () => void;
};

const HeaderMenu: FC<Props> = ({ onLogout }) => (
    <div className={styles.headerMenu}>
        <Button name={"Sign out"} onClick={onLogout} />
    </div>
);

export default HeaderMenu;
