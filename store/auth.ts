import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
    id: number | null;
    name: string | null;
    isLoggedIn: boolean;
    logIn: (params: { id: number; name: string; }) => void;
    logOut: () => void;
}

const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            id: null,
            name: null,
            isLoggedIn: false,
            fId: null,
            logIn: ({ id, name}) =>
                set({ id, name, isLoggedIn: true }),
            logOut: () =>
                set({ id: null, name: null, isLoggedIn: false }),
        }),
        {
            name: "auth-session",

        }
    )
);

export default useAuthStore;
