import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    SignUpRequest,
    SignInRequest,
    AuthResponse,
    UserData,
} from "@/common/types/types";
import {
    API,
    API_ROUTES,
    AUTH_ROUTES,
    HTTP_METHODS,
    TOKEN_NAME,
} from "@/common/enums/enums";
import { localStorageService } from "@/services/services";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: API.URL }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        signUp: builder.mutation<AuthResponse, SignUpRequest>({
            query: (body: SignUpRequest) => ({
                url: `${API_ROUTES.AUTH}${AUTH_ROUTES.REGISTER}`,
                method: HTTP_METHODS.POST,
                body,
            }),
            invalidatesTags: ["User"],
        }),

        signIn: builder.mutation<AuthResponse, SignInRequest>({
            query: (body: SignInRequest) => ({
                url: `${API_ROUTES.AUTH}${AUTH_ROUTES.TOKEN}`,
                method: HTTP_METHODS.POST,
                body,
            }),
            invalidatesTags: ["User"],
        }),

        revalidate: builder.query<UserData, void>({
            query: () => ({
                url: `${API_ROUTES.AUTH}${AUTH_ROUTES.USER}`,
                headers: {
                    Authorization: `Bearer ${localStorageService.getByKey(TOKEN_NAME.ACCESS)}`,
                },
            }),
            providesTags: ["User"],
        }),
    }),
});

const { useSignInMutation, useSignUpMutation, useRevalidateQuery } = authApi;

export { authApi, useSignInMutation, useSignUpMutation, useRevalidateQuery };
