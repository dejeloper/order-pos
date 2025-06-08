import axios from "axios";

import axiosInstance from "@/services/axiosInstance";
import {Product} from "@/interfaces/Products/products.interface";

export async function getProductsService(): Promise<Product[]> {
	try {
		const response = await axiosInstance.get("/products");

		if (!response.data || !Array.isArray(response.data)) {
			throw new Error("Formato de respuesta inválido");
		}

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
			throw new Error("La solicitud tardó demasiado. Intentar de nuevo más tarde.");
		}

		throw new Error("Error al obtener productos. Intentar de nuevo más tarde.");

	}
}