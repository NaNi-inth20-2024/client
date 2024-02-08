import { FC } from "react";
import { Navigate } from "react-router-dom";
import Button from "../../../button/button";

import styles from "./styles.module.scss";

const HeaderMenu: FC = () => (
    <div className={styles.headerMenu}>
        <Button name={"Profile"} onClick={() => Navigate({ to: "/user" })} />
        <Button name={"Sign out"} onClick={() => Navigate({ to: "/auth" })} />
    </div>
);

export default HeaderMenu;
