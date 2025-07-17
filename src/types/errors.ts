export type LoginErrors = {
    login?: string,
    password?: string,
    serverError?: string
};

export type RegistrationErrors = {
    username?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    serverError?: string
};

export type RegistrationResponseErrors = {
    username?: string[],
    email?: string[],
};

export type ProjectErrors = {
    title: string;
    description: string;
}