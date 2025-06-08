import AppHeader from "@/layout/AppHeader";
import PageBreadcrumb from "./PageBreadCrumb";

export default function PagesWrapper({
	breadcrumbItems,
	title,
	subtitle,
	children,
	actions,
}: {
	breadcrumbItems: {name: string; href?: string}[];
	title?: string;
	subtitle?: string;
	children?: React.ReactNode;
	actions?: React.ReactNode;
}) {
	return (
		<>
			<AppHeader items={breadcrumbItems} />
			<div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:py-6">
				<div className="flex lg:hidden flex-wrap items-center justify-between gap-3 mb-4 px-0">
					<PageBreadcrumb items={breadcrumbItems} />
				</div>
				<div className="min-h-[calc(100dvh-180px)] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-7 text-gray-800 dark:text-white/90">

					<div className="flex items-center justify-between mb-8">
						<div>
							{title &&
								(<h1 className="text-3xl font-bold tracking-tight">{title}</h1>)
							}
							{subtitle &&
								<p className="text-muted-foreground mt-2">{subtitle}</p>
							}
						</div>
						{actions}
					</div>

					{children}
				</div>
			</div>
		</>)
}
