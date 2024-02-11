type UserData = {
    id: string;
    username: string;
    email: string;
};

type TokenDto = {
    access: string;
    refresh: string;
};

type SignUpRequest = {
    username: string;
    password: string;
    email: string;
};

type SignInRequest = {
    username: string;
    password: string;
};

type AuthResponse = TokenDto & {
    user: UserData;
};

export type { SignUpRequest, SignInRequest, AuthResponse, UserData };
