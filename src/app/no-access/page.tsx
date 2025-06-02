'use client'

import {ThemeToggleButton} from "@/components/common/ThemeToggleButton";
import {useErrorStore} from "@/stores/errorStore";
import {LogOut} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useEffect} from "react";
import toast from "react-hot-toast";

export default function NoAccessPage() {
	const {isError, error, pathname} = useErrorStore();

	useEffect(() => {
		if (isError) {
			toast.error(error || "Acceso denegado. No tienes permisos para acceder a esta página.",);
		}
	}, [isError, error]);

	return (
		<section className="grid h-[calc(100dvh)] place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-sm text-center">
					<div className="mx-auto my-4  flex items-center justify-center">
						<Image
							width={154}
							height={32}
							className="dark:hidden"
							src="/images/logo/logo.png"
							alt="Logo"
							style={{aspectRatio: "955/261"}}
						/>
						<Image
							width={154}
							height={32}
							className="hidden dark:block"
							src="/images/logo/logo-dark.png"
							alt="Logo"
							style={{aspectRatio: "955/261"}}
						/>
					</div>
					<h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-200 sm:text-7xl">Sin Acceso</h1>
					{isError && error && (
						<p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{error}</p>
					)}
					<p className="text-xs font-semibold text-cyan-600">{pathname}</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<ThemeToggleButton />
						<Link href={'/home'} className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
							Volver al Inicio
						</Link>
						<Link href={"/auth/logout"} className="text-sm font-semibold text-gray-900 dark:text-gray-200">
							<span>Cambiar Usuario</span>
							<LogOut className="inline h-5 w-5 ml-2" />
						</Link>
					</div>
				</div>
			</div>
		</section >
	);
}