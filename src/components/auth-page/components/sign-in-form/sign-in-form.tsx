import { FC, useCallback, useState } from "react";
import {
    isSuccessfulResponseDto,
    SignInResponse,
    type SignInRequest,
} from "@/common/types/types";
import {
    getInputDataChangeHandler,
    handleSubmit,
} from "@/common/utils/forms.utils";
import Input from "@/components/common/input/input";
import Button from "@/components/common/button/button";
import { useSignInMutation } from "@/store/auth.api";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/common/enums/enums";
import { localStorageService } from "@/services/services";

const initialState: SignInRequest = {
    username: "",
    password: "",
};

const SignInForm: FC = () => {
    const navigate = useNavigate();
    const [signInData, setSignInData] = useState<SignInRequest>(initialState);
    const [signIn] = useSignInMutation({
        fixedCacheKey: "shared-sign-in-data",
    });

    const handleFormDataChange =
        getInputDataChangeHandler<SignInRequest>(setSignInData);

    const handleSignIn = useCallback(async () => {
        const result = await signIn(signInData);

        if (!isSuccessfulResponseDto<SignInResponse>(result)) {
            return;
        }

        localStorageService.set("token", result.data.access);
        localStorageService.set("refresh", result.data.refresh);
        navigate(APP_ROUTES.AUCTIONS);
    }, [signInData, signIn, navigate]);

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
