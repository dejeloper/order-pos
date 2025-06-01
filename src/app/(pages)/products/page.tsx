import Protected from "@/components/common/Protected";
import PagesWrapper from "@/components/common/Wrapper";

export default function ProductsPage() {

	const breadcrumbItems = [
		{name: "Home", href: "/"},
		{name: "Productos", href: "/products"},
		{name: "Lista de Productos"}
	];

	return (
		<Protected requiredPermission="view_products">
			<PagesWrapper breadcrumbItems={breadcrumbItems}>

			</PagesWrapper>
		</Protected>
	);
} 