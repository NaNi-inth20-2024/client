import { FC, useCallback, useState } from "react";
import {
    isSuccessfulResponseDto,
    SignUpResponse,
    type SignUpRequest,
    SignInResponse,
} from "../../../../common/types/types";
import {
    getInputDataChangeHandler,
    handleSubmit,
} from "../../../../common/utils/forms.utils";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";
import { useSignInMutation, useSignUpMutation } from "@/store/auth.api";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/common/enums/enums";
import { localStorageService } from "@/services/services";

const initialState: SignUpRequest = {
    username: "",
    email: "",
    password: "",
};

const SignUpForm: FC = () => {
    const [signUpData, setSignUpData] = useState<SignUpRequest>(initialState);
    const [signUp] = useSignUpMutation();
    const [signIn] = useSignInMutation();
    const navigate = useNavigate();

    const handleFormDataChange =
        getInputDataChangeHandler<SignUpRequest>(setSignUpData);

    const handleSignUp = useCallback(async () => {
        const signUpResult = await signUp(signUpData);

        if (!isSuccessfulResponseDto<SignUpResponse>(signUpResult)) {
            return;
        }

        const signInResult = await signIn({
            username: signUpData.username,
            password: signUpData.password,
        });

        if (!isSuccessfulResponseDto<SignInResponse>(signInResult)) {
            return;
        }

        localStorageService.set("token", signInResult.data.access);
        localStorageService.set("refresh", signInResult.data.refresh);
        navigate(APP_ROUTES.AUCTIONS);
    }, [signIn, signUp, signUpData, navigate]);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <Input
                    name="username"
                    type="text"
                    value={signUpData.username}
                    onChange={handleFormDataChange("username")}
                />
            </label>

            <label>
                Email
                <Input
                    name="email"
                    type="email"
                    value={signUpData.email}
                    onChange={handleFormDataChange("email")}
                />
            </label>

            <label>
                Password
                <Input
                    name="password"
                    type="password"
                    value={signUpData.password}
                    onChange={handleFormDataChange("password")}
                />
            </label>

            <Button
                name="Sign Up"
                type="submit"
                classname="authSubmitButton"
                onClick={handleSignUp}
            />
        </form>
    );
};

export default SignUpForm;
