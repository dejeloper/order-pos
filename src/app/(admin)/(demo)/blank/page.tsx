import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next"; 

export const metadata: Metadata = {
  title: "OrderPos - Blank Page",
  description: "Página en blanco",
};

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "demos", href: "/" }, 
  { name: "Page Blank" }
];

export default function BlankPage() {
  return (
    <div>
     <PageBreadcrumb items={breadcrumbItems} />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Un pequeño título aquí
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Contenido aquí:
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim soluta fuga omnis. Delectus laudantium incidunt perferendis, quo rerum numquam nihil. Facilis, quam voluptatum numquam reiciendis tenetur molestiae perferendis cumque quaerat!
          </p>
        </div>
      </div>
    </div>
  );
}
