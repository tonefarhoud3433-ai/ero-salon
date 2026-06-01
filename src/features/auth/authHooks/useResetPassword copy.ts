import { authService } from "../../../services/AuthService";

export function useResetPassword() {
  const reset = (password: string) => {
    return authService.resetPassword(password);
  };

  return { reset };
}