import { FC, useCallback, useState } from "react";
import {
    isSuccessfulResponseDto,
    AuthResponse,
    type SignInRequest,
} from "@/common/types/types";
import {
    getInputDataChangeHandler,
    handleSubmit,
} from "@/common/utils/forms.utils";
import Input from "@/components/common/input/input";
import Button from "@/components/common/button/button";
import { authApi, useSignInMutation } from "@/store/auth.api";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES, TOKEN_NAME } from "@/common/enums/enums";
import { localStorageService } from "@/services/services";
import { useAppDispatch } from "@/store/hooks";

const initialState: SignInRequest = {
    username: "",
    password: "",
};

const SignInForm: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState<SignInRequest>(initialState);
    const [signIn] = useSignInMutation({
        fixedCacheKey: "shared-sign-in-data",
    });

    const handleFormDataChange =
        getInputDataChangeHandler<SignInRequest>(setSignInData);

    const handleSignIn = useCallback(async () => {
        const result = await signIn(signInData);

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
    }, [dispatch, signInData, signIn, navigate]);

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
                Password
                <Input
                    name="password"
                    type="password"
                    value={signInData.password}
                    onChange={handleFormDataChange("password")}
                />
            </label>

            <Button
                name="Sign in"
                type="submit"
                classname="authSubmitButton"
                onClick={handleSignIn}
            />
        </form>
    );
};

export default SignInForm;
