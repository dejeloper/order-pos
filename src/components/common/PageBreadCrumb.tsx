import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  name: string;
  href?: string;  
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const lastIndex = items.length - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {items[lastIndex].name}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5 text-sm">
              {index < lastIndex ? (
                <>
                  <Link
                    className="text-gray-500 dark:text-gray-400"
                    href={item.href || "#"}
                  >
                    {item.name}
                  </Link>
                  <svg
                    className="stroke-current text-gray-400"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              ) : (
                <span className="text-gray-800 dark:text-white/90">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};


export default PageBreadcrumb;
