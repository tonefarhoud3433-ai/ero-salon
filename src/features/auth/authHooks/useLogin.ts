import { authService } from "../../../services/AuthService";

export function useLogin() {
    const login = async (email: string, password: string) => {
        const result = await authService.signIn(email, password);
        return result;
    };

    return { login };
}