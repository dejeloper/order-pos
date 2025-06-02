"use client";

import {FC} from "react";
import {Loader2} from "lucide-react";

interface FullPageLoaderProps {
	message?: string;
}

const FullPageLoader: FC<FullPageLoaderProps> = ({message = "Cargando..."}) => {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
			<Loader2 className="h-12 w-12 animate-spin text-white" />
			<p className="mt-4 text-white text-sm">{message}</p>
		</div>
	);
};

export default FullPageLoader;
