"use client";

import {FC} from "react";
import {Loader2} from "lucide-react";

interface FullPageLoaderProps {
	message?: string;
}

const FullPageLoader: FC<FullPageLoaderProps> = ({message = "Cargando..."}) => {
	return (
		<div className="fixed inset-0 z-1000 flex flex-col items-center justify-center bg-gray-100/20 dark:bg-gray-800/20  backdrop-blur-sm">
			<Loader2 className="h-12 w-12 animate-spin dark:text-white text-slate-700" />
			<p className="mt-4 dark:text-white text-slate-700 text-sm">{message}</p>
		</div>
	);
};

export default FullPageLoader;
