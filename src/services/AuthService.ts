import supabase from "../utils/supabase";

export const authService = {
    // LOGIN
    signIn(email: string, password: string) {
        return supabase.auth.signInWithPassword({
            email,
            password,
        });
    },

    // REGISTER
    signUp(email: string, password: string) {
        return supabase.auth.signUp({
            email,
            password,
        });
    },

    // LOGOUT
    signOut() {
        return supabase.auth.signOut();
    },

    // SESSION
    getSession() {
        return supabase.auth.getSession();
    },

    // USER
    getUser() {
        return supabase.auth.getUser();
    },

    // FORGOT PASSWORD
    forgotPassword(email: string) {
        return supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
    },

    // RESET PASSWORD
    resetPassword(password: string) {
        return supabase.auth.updateUser({
            password,
        });
    },

    // AUTH STATE
    onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
        return supabase.auth.onAuthStateChange(callback);
    },
};