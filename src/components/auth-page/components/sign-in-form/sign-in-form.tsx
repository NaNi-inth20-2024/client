import { FC, useState } from "react";
import type { SignInDto } from "../../../../common/types/types";
import {
    getInputDataChangeHandler,
    handleSubmit,
} from "../../../../common/utils/forms.utils";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";

const initialState: SignInDto = {
    email: "",
    password: "",
};

const SignInForm: FC = () => {
    const [signInData, setSignInData] = useState<SignInDto>(initialState);
    const handleFormDataChange =
        getInputDataChangeHandler<SignInDto>(setSignInData);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <Input
                    name="email"
                    type="email"
                    value={signInData.email}
                    onChange={handleFormDataChange("email")}
                />
            </label>

            <label>
                Password
                <Input
                    name="password"
                    type="password"
                    value={signInData.password}
                    onChange={handleFormDataChange("password")}
                />
            </label>

            <Button name="Sign in" type="submit" classname="authSubmitButton" />
        </form>
    );
};

export default SignInForm;
