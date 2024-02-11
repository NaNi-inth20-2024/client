import { FC } from "react";
import HeaderMenu from "./components/header-menu/header-menu";
import { localStorageService } from "@/services/services";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/common/enums/app-routes.enum";

const Header: FC = () => {
    const isUserLoggedIn = localStorageService.getByKey("access");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorageService.reset();
        navigate(APP_ROUTES.AUTH);
    };

    return (
        <header>
            <h1 className={styles.header__textLogo}>
                <span className={styles.coloredFragment}>PURPLE</span> MARKET
            </h1>
            <div className={styles.header__userData}>
                {isUserLoggedIn && <HeaderMenu onLogout={handleLogout} />}
            </div>
        </header>
    );
};

export default Header;
