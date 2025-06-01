import {Product} from "@/interfaces/Products/products.interface";

export async function fetchProducts(token: string): Promise<Product[]> {
	const response = await fetch("http://localhost:8000/api/products", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	const data = await response.json();
	return data;
}