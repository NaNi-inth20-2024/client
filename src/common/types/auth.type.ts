type SignInDto = {
    email: string;
    password: string;
};

type SignUpDto = SignInDto & {
    username: string;
    firstName?: string;
    lastName?: string;
};

export type { SignInDto, SignUpDto };
