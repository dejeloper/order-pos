import {Product} from "@/interfaces/Products/products.interface";
import axiosInstance from "../axiosInstance";

export async function getProductsService(): Promise<Product[]> {
	const response = await axiosInstance.get("/products");
	return response.data;
}