import {create} from "zustand";
import {persist} from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	setToken: (token: string) => void;
	logout: () => void;
	syncCookieToState: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: null,
			isAuthenticated: false,

			setToken: (token: string) => {
				Cookies.set("auth_token", token, {
					expires: 1,
					sameSite: "Lax",
					secure: process.env.NODE_ENV === "production",
				});
				set({token, isAuthenticated: true});
			},

			logout: () => {
				Cookies.remove("auth_token");
				set({token: null, isAuthenticated: false});
			},

			syncCookieToState: () => {
				const cookieToken = Cookies.get("auth_token");
				if (cookieToken && !get().token) {
					set({token: cookieToken, isAuthenticated: true});
				}
			},
		}),
		{
			name: "auth-storage",
		}
	)
);
