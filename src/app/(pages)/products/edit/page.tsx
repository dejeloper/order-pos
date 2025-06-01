import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";

export default function EditProductPage() {
	const breadcrumbItems = [
		{name: "Home", href: "/"},
		{name: "Productos", href: "/products"},
		{name: "Editar Producto"}
	];
	return (
		<Protected requiredPermission="edit_products">
			<PagesWrapper breadcrumbItems={breadcrumbItems}>

			</PagesWrapper>
		</Protected>
	);
}
