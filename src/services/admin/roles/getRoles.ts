import axios from "axios";

import axiosInstance from "@/services/axiosInstance";
import {Role} from "@/interfaces/Admin/roles.interface";

export async function getRolesService(): Promise<Role[]> {
	try {
		const response = await axiosInstance.get("/roles");

		if (!response.data || !Array.isArray(response.data)) {
			throw new Error("Formato de respuesta inválido");
		}

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
			throw new Error("La solicitud tardó demasiado. Intentar de nuevo más tarde.");
		}

		throw new Error("Error al obtener roles. Intentar de nuevo más tarde.");
	}
}