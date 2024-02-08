import { FC, useState } from "react";
import HeaderMenu from "./components/header-menu/header-menu";

import styles from "./styles.module.scss";

const Header: FC = () => {
    const [isHeaderMenuShown, setIsHeaderMenuShown] = useState<boolean>(false);
    return (
        <header>
            <h1 className={styles.header__textLogo}>
                <span className={styles.coloredFragment}>PURPLE</span> MARKET
            </h1>
            <div className={styles.header__userData}>
                <img
                    src="/profile_template.jpg"
                    alt="avatar"
                    className={styles.header__avatar}
                    onClick={() =>
                        setIsHeaderMenuShown((prevState) => !prevState)
                    }
                />
                <div className={styles.header__menuContainer}>
                    {isHeaderMenuShown && <HeaderMenu />}
                </div>
            </div>
        </header>
    );
};

export default Header;
