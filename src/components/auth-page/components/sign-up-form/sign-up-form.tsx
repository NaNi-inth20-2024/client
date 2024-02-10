import { FC, useState } from "react";
import type { SignUpDto } from "../../../../common/types/types";
import {
    getInputDataChangeHandler,
    handleSubmit,
} from "../../../../common/utils/forms.utils";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";

const initialState: SignUpDto = {
    username: "",
    email: "",
    password: "",
};

const SignUpForm: FC = () => {
    const [signInData, setSignUpData] = useState<SignUpDto>(initialState);
    const handleFormDataChange =
        getInputDataChangeHandler<SignUpDto>(setSignUpData);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <Input
                    name="username"
                    type="text"
                    value={signInData.username}
                    onChange={handleFormDataChange("username")}
                />
            </label>

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

            <Button name="Sign Up" type="submit" classname="authSubmitButton" />
        </form>
    );
};

export default SignUpForm;
