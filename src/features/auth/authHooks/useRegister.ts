import { authService } from "../../../services/AuthService";

export function useRegister() {
    const register = (email: string, password: string) => {
        return authService.signUp(email, password);
    };

    return { register };
}