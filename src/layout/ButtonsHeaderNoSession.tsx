import {ThemeToggleButton} from "@/components/common/ThemeToggleButton";
import Link from "next/link";

export default function ButtonsHeaderNoSession({className}: {className?: string;}) {
	return (
		<section className={`flex items-center justify-end gap-2 ${className}`}>
			<ThemeToggleButton />
			<Link href="/auth/login"
				className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
				<svg xmlns="http://www.w3.org/2000/svg"
					width="24" height="24" viewBox="0 0 24 24">
					<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
						<path d="M9 8V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-2" />
						<path d="M3 12h13l-3-3m0 6l3-3" />
					</g>
				</svg>
			</Link>
		</section>
	);
}