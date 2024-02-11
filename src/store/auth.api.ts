import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    SignUpRequest,
    SignUpResponse,
    SignInRequest,
    SignInResponse,
} from "@/common/types/types";
import {
    API,
    API_ROUTES,
    AUTH_ROUTES,
    HTTP_METHODS,
} from "@/common/enums/enums";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: API.URL }),
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpResponse, SignUpRequest>({
            query: (body: SignUpRequest) => ({
                url: `${API_ROUTES.AUTH}${AUTH_ROUTES.REGISTER}`,
                method: HTTP_METHODS.POST,
                body,
            }),
            transformResponse: (
                rawResult: { results: SignUpResponse },
                meta,
            ) => {
                const { results } = rawResult;
                console.log(rawResult, meta);

                return results;
            },
        }),

        signIn: builder.mutation<SignInResponse, SignInRequest>({
            query: (body: SignInRequest) => ({
                url: `${API_ROUTES.AUTH}${AUTH_ROUTES.TOKEN}`,
                method: HTTP_METHODS.POST,
                body,
            }),
            transformResponse: (results: SignInResponse, meta) => {
                console.log(results, meta);

                return results;
            },
        }),
    }),
});

const { useSignInMutation, useSignUpMutation } = authApi;

export { authApi, useSignInMutation, useSignUpMutation };
