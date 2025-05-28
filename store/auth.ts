import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
    id: number | null;
    role: string | null;
    isLoggedIn: boolean;
    token: string | null;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    logIn: (params: { id: number; token: string; role: string }) => void;
    logOut: () => void;
}

const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            id: null,
            name: null,
            code: null,
            isLoggedIn: false,
            token: null,
            role: null,
            hasHydrated: false,
            setHasHydrated: (state) => set({ hasHydrated: state }),
            logIn: ({ id, token, role }) =>
                set({ id, isLoggedIn: true, token, role }),
            logOut: () =>
                set({ id: null, isLoggedIn: false, role: null, token: null }),
        }),
        {
            name: "auth-session",
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHasHydrated(true);
                }
            },

        }
    )
);

export default useAuthStore;
