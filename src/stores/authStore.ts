import {create} from "zustand";
import {persist} from "zustand/middleware";
import Cookies from "js-cookie";

import {AuthUser} from "@/interfaces/Auth";


interface AuthState {
	token: string | null;
	user: AuthUser | null;
	isAuthenticated: boolean;
	setAuth: (token: string, user: AuthUser) => void;
	logout: () => void;
	syncCookieToState: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,

			setAuth: (token: string, user: AuthUser) => {
				Cookies.set("auth_token", token, {
					expires: 1,
					sameSite: "Lax",
					secure: process.env.NODE_ENV === "production",
				});
				set({token, user, isAuthenticated: true, });
			},

			logout: () => {
				Cookies.remove("auth_token");
				set({token: null, user: null, isAuthenticated: false});
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
