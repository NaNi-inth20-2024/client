import { FC, useState } from "react";
import HeaderMenu from "./components/header-menu/header-menu";
import { localStorageService } from "@/services/services";
import { useRevalidateQuery, authApi } from "@/store/auth.api";

import styles from "./styles.module.scss";
import { useAppDispatch } from "@/store/hooks";
import Button from "../button/button";
import { Link } from "react-router-dom";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { data: userData } = useRevalidateQuery();

    const handleLogout = () => {
        dispatch(authApi.util.resetApiState());
        localStorageService.reset();
        setIsMenuOpen(false);
    };

    return (
        <header>
            <h1 className={styles.header__textLogo}>
                <Link to="/">
                    <span className={styles.coloredFragment}>PURPLE</span>{" "}
                    MARKET
                </Link>
            </h1>
            {userData?.username ? (
                <div className={styles.header__userData}>
                    <>
                        <svg
                            className={styles.bars}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>

                        <div className={styles.header__menuContainer}>
                            <HeaderMenu
                                visible={isMenuOpen}
                                username={userData?.username}
                                onLogout={handleLogout}
                                onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        </div>
                    </>
                </div>
            ) : (
                <Button name="Sign in" link="/auth" />
            )}
        </header>
    );
};

export default Header;
