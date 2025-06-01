import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";

export default function DeleteProductPage() {
	const breadcrumbItems = [
		{name: "Home", href: "/"},
		{name: "Productos", href: "/products"},
		{name: "Eliminar Producto"}
	];
	return (
		<Protected requiredPermission="delete_products">
			<PagesWrapper breadcrumbItems={breadcrumbItems}>
				<h1>Eliminar Producto</h1>
				<p>Esta es la página para eliminar productos.</p>
			</PagesWrapper>
		</Protected>
	);
}
