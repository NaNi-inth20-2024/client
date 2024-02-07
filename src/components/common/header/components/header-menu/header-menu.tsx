import { FC } from "react";
import Button from "../../../button/button";

import styles from "./styles.module.scss";

const HeaderMenu: FC = () => (
    <div className={styles.headerMenu}>
        <Button
            name={"Profile"}
            onClick={() => console.log("Go to profile")}
            width={100}
            height={30}
        />
        <Button
            name={"Logout"}
            onClick={() => console.log("Logout")}
            width={100}
            height={30}
        />
    </div>
);

export default HeaderMenu;
