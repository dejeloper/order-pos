"use client";

import {useEffect, useState} from "react";

import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";
import {useAuthStore} from "@/stores/authStore";
import {getProductsService} from "@/services/products/getProducts";
import {Product} from "@/interfaces/Products/products.interface";
import FullPageLoader from "@/components/common/FullPageLoader";
import toast from "react-hot-toast";

export default function ProductsPage() {
	const {token} = useAuthStore();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const breadcrumbItems = [
		{name: "Home", href: "/"},
		{name: "Productos", href: "/products"},
		{name: "Lista de Productos"},
	];

	const title = "Lista de Productos"
	const subtitle = "Gestione fácilmente los productos del sistema";

	useEffect(() => {
		if (!token) return;

		const loadProducts = async () => {
			setLoading(true);
			setError(null);

			try {
				const productsData = await getProductsService();

				setProducts(productsData);
			} catch (error) {
				setError(error + " ");
				toast.error(error + " ");
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, [token]);

	return (
		<Protected requiredPermission="view_products">
			<PagesWrapper breadcrumbItems={breadcrumbItems} title={title} subtitle={subtitle}>
				{loading && <FullPageLoader message="Cargando productos..." />}
				{error && <p className="text-red-500">{error}</p>}

				<ul className="mt-4 space-y-2">
					{products.map((product) => (
						<li key={product.id} className="border p-2 rounded">
							<strong>{product.name}</strong> - ${product.price}
						</li>
					))}
				</ul>
			</PagesWrapper>
		</Protected>
	);
}
