import { FC, useState } from "react";
import type { SignInDto } from "../../../../common/types/types";
import {
    getFormDataChangeHandler,
    handleSubmit,
} from "../../shared/authFormsEventHandlers";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";

import styles from "./styles.module.scss";

const initialState: SignInDto = {
    email: "",
    password: "",
};

const SignInForm: FC = () => {
    const [signInData, setSignInData] = useState<SignInDto>(initialState);
    const handleFormDataChange =
        getFormDataChangeHandler<SignInDto>(setSignInData);

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <label className={styles.signInForm__label}>Email</label>
                <Input
                    name="email"
                    type="email"
                    value={signInData.email}
                    onChange={handleFormDataChange("email")}
                />
                <label className={styles.signInForm__label}>Password</label>
                <Input
                    name="password"
                    type="password"
                    value={signInData.password}
                    onChange={handleFormDataChange("password")}
                />
                <Button
                    name="Sign in"
                    type="submit"
                    classname="authSubmitButton"
                />
            </form>
        </div>
    );
};

export default SignInForm;
