import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";

export default function CreateProductPage() {
	const breadcrumbItems = [
		{name: "Home", href: "/"},
		{name: "Productos", href: "/products"},
		{name: "Crear Producto"}
	];
	return (
		<Protected requiredPermission="create_products">
			<PagesWrapper breadcrumbItems={breadcrumbItems}>

			</PagesWrapper>
		</Protected>
	);
}
