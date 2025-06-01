import {create} from "zustand";
import {persist} from "zustand/middleware";
import Cookies from 'js-cookie';

interface ErrorState {
	error: string | null;
	isError: boolean;
	pathname: string | null;
	setError: (error: string | null, pathname: string | null) => void;
	syncCookieToState: () => void;
	clearError: () => void;
}

export const useErrorStore = create<ErrorState>()(
	persist(
		(set, get) => ({
			error: null,
			isError: false,
			pathname: null,

			setError: (error: string | null, pathname: string | null) => {
				if (error) {
					Cookies.set("error", error, {
						expires: 1,
						sameSite: "Lax",
						secure: process.env.NODE_ENV === "production",
					});
					Cookies.set("pathname", pathname, {
						expires: 1,
						sameSite: "Lax",
						secure: process.env.NODE_ENV === "production",
					});
					set({error, isError: true, pathname});
				}
			},

			syncCookieToState: () => {
				const cookieError = Cookies.get("error");
				if (cookieError && !get().error) {
					set({error: cookieError, isError: true, pathname: Cookies.get("pathname") || null});
				}
			},

			clearError: () => {
				Cookies.remove("error");
				set({error: null, isError: false, pathname: null});
			},
		}),
		{
			name: "error-storage",
		}
	)

)
