import { FC, useCallback, useState } from "react";
import {
    isSuccessfulResponseDto,
    type SignUpRequest,
    type AuthResponse,
} from "../../../../common/types/types";
import {
    getInputDataChangeHandler,
    handleSubmit,
} from "../../../../common/utils/forms.utils";
import Input from "../../../common/input/input";
import Button from "../../../common/button/button";
import { authApi, useSignUpMutation } from "@/store/auth.api";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES, TOKEN_NAME } from "@/common/enums/enums";
import { localStorageService } from "@/services/services";
import { useAppDispatch } from "@/store/hooks";

const initialState: SignUpRequest = {
    username: "",
    email: "",
    password: "",
};

const SignUpForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState<SignUpRequest>(initialState);
    const [signUp] = useSignUpMutation();

    const handleFormDataChange =
        getInputDataChangeHandler<SignUpRequest>(setSignUpData);

    const handleSignUp = useCallback(async () => {
        const result = await signUp(signUpData);

        if (!isSuccessfulResponseDto<AuthResponse>(result)) {
            return;
        }

        localStorageService.set(TOKEN_NAME.ACCESS, result.data.access);
        localStorageService.set(TOKEN_NAME.REFRESH, result.data.refresh);

        dispatch(
            authApi.util.upsertQueryData(
                "revalidate",
                undefined,
                result.data.user,
            ),
        );

        navigate(APP_ROUTES.AUCTIONS);
    }, [dispatch, signUp, signUpData, navigate]);

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
