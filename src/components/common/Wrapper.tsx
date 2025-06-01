import PageBreadcrumb from "./PageBreadCrumb";

export default function PagesWrapper({
	breadcrumbItems,
	title,
	children
}: {
	breadcrumbItems: {name: string; href?: string}[];
	title?: string;
	children?: React.ReactNode;
}) {
	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<div className="min-h-[calc(100dvh-180px)] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-7 text-gray-800 dark:text-white/90">
				{title &&
					(<h3 className="mb-2 font-semibold text-theme-xl sm:text-2xl text-center">{title}</h3>)
				}
				{children}
			</div>
		</>)
}
