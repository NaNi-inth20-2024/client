import { FC } from "react";
import HeaderMenu from "./components/header-menu/header-menu";

import styles from "./styles.module.scss";

const Header: FC = () => {
    return (
        <header>
            <h1 className={styles.header__textLogo}>
                <span className={styles.coloredFragment}>PURPLE</span> MARKET
            </h1>
            <div className={styles.header__userData}>
                <div className={styles.header__menuContainer}>
                    <HeaderMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
