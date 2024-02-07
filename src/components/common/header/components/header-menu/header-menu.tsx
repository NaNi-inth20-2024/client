import { FC } from "react";
import Button from "../../../button/button";

import styles from "./styles.module.scss";

const HeaderMenu: FC = () => (
    <div className={styles.headerMenu}>
        <Button name={"Profile"} onClick={() => console.log("Go to profile")} />
        <Button name={"Sign out"} onClick={() => console.log("Logout")} />
    </div>
);

export default HeaderMenu;
