import { FC, useState } from "react";
import type { SignUpDto } from "../../../../common/types/types";
import {
    getFormDataChangeHandler,
    handleSubmit,
} from "../../shared/authFormsEventHandlers";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";

const initialState: SignUpDto = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
};

const SignUpForm: FC = () => {
    const [signInData, setSignUpData] = useState<SignUpDto>(initialState);
    const handleFormDataChange =
        getFormDataChangeHandler<SignUpDto>(setSignUpData);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <Input
                    name="username"
                    type="text"
                    value={signInData.username}
                    onChange={handleFormDataChange("username")}
                />
                <label>Email</label>
                <Input
                    name="email"
                    type="email"
                    value={signInData.email}
                    onChange={handleFormDataChange("email")}
                />
                <label>First name</label>
                <Input
                    name="firstName"
                    type="text"
                    value={signInData.firstName}
                    onChange={handleFormDataChange("firstName")}
                />
                <label>Last name</label>
                <Input
                    name="lastName"
                    type="text"
                    value={signInData.lastName}
                    onChange={handleFormDataChange("lastName")}
                />
                <label>Password</label>
                <Input
                    name="password"
                    type="password"
                    value={signInData.password}
                    onChange={handleFormDataChange("password")}
                />
                <Button
                    name="Sign Up"
                    type="submit"
                    classname="authSubmitButton"
                />
            </form>
        </div>
    );
};

export default SignUpForm;
