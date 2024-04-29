export interface Tokens {
    accessToken: string;
}

export interface JwtPayload {
    id: string;
    email: string;
    roles: string[];
}