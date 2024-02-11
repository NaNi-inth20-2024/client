type SignUpRequest = {
    username: string;
    password: string;
    email: string;
};

type SignUpResponse = {
    username: string;
    email: string;
};

type SignInRequest = {
    username: string;
    password: string;
};

type SignInResponse = {
    access: string;
    refresh: string;
};

export type { SignUpRequest, SignUpResponse, SignInRequest, SignInResponse };
