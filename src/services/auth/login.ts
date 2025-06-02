import axios from "axios";

import axiosInstance from "@/services/axiosInstance";
import {AuthUser} from "@/interfaces/Auth";

interface LoginResponse {
	token: string;
	user: AuthUser;
}

interface LoginCredentials {
	username: string;
	password: string;
}

export async function loginService({username, password}: LoginCredentials): Promise<LoginResponse> {
	try {
		const response = await axiosInstance.post<LoginResponse>("/login", {username, password});

		if (!response.data.token) {
			throw new Error("No se recibió un token de autenticación");
		}

		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const message = error.response?.data?.message || "Usuario o contraseña incorrectos";
			throw new Error(message);
		}
		if (error && typeof error === "object" && "message" in error) {
			throw new Error((error as {message?: string}).message || "Error en el servicio de login");
		}
		throw new Error("Error en el servicio de login");
	}
}
