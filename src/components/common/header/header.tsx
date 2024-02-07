import { FC, useState } from "react";
import HeaderMenu from "./components/header-menu/header-menu";

import styles from "./styles.module.scss";
import Image from "../image/image";

const Header: FC = () => {
    const [isHeaderMenuShown, setIsHeaderMenuShown] = useState<boolean>(false);
    return (
        <div className={styles.header}>
            <h1 className={styles.header__textLogo}>
                <span className={styles.header_textLogo_coloredFragment}>
                    PURPLE
                </span>{" "}
                MARKET
            </h1>
            <div className={styles.header__userData}>
                <p className={styles.header__username}>DoopSnogg</p>
                <Image
                    src={"/profile_template.jpg"}
                    preset={"avatar"}
                    onClick={() =>
                        setIsHeaderMenuShown((prevState) => !prevState)
                    }
                />
                <div className={styles.header__menuContainer}>
                    {isHeaderMenuShown && <HeaderMenu />}
                </div>
            </div>
        </div>
    );
};

export default Header;
