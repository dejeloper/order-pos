import PageBreadcrumb from "./PageBreadCrumb";

export default function PagesWrapper({
	breadcrumbItems,
	children
}: {
	breadcrumbItems: { name: string; href?: string }[];
	children: React.ReactNode;
}) { 
	return	(
	<>
	<PageBreadcrumb items={breadcrumbItems} /> 
			 <div className="min-h-[calc(100dvh-180px)] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-7 text-gray-800 dark:text-white/90"> 
         {children} 
      </div>
	</>)
}
