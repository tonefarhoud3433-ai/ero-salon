import { authService } from "../../../services/AuthService";

export function useForgotPassword() {
    const sendReset = (email: string) => {
        return authService.forgotPassword(email);
    };

    return { sendReset };
}