import { FC, useState } from "react";
import SignInForm from "./components/sign-in-form/sign-in-form";
import SignUpForm from "./components/sign-up-form/sign-up-form";

import styles from "./styles.module.scss";

type AuthType = "Sign In" | "Sign Up";
const authTypeToAuthForm: Record<AuthType, FC> = {
    "Sign In": SignInForm,
    "Sign Up": SignUpForm,
};

const AuthPage: FC = () => {
    const [authType, setAuthType] = useState<AuthType>("Sign In");
    const handleAuthTypeSwap = () =>
        setAuthType((prevState) =>
            prevState === "Sign In" ? "Sign Up" : "Sign In",
        );

    const Form = authTypeToAuthForm[authType];
    const FormLogo = () => (
        <h1 className={styles.authPage_formWrapper__formLogo}>
            <span
                className={
                    styles.authPage_formWrapper__formLogoColouredFragment
                }
            >
                Sign{" "}
            </span>
            {authType.split(" ")[1]}
        </h1>
    );

    return (
        <div className={styles.authPage}>
            <div className={styles.authPage__formWrapper}>
                <FormLogo />
                <Form />
                <p className={styles.authPage__formWrapper__formSwapParagraph}>
                    Don't have an account?
                    <span
                        onClick={handleAuthTypeSwap}
                        className={
                            styles.authPage__formWrapper__authPage__formWrapper__formSwapParagraph_label
                        }
                    >
                        {authType}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
