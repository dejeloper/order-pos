'use client';

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useAuthStore} from "@/stores/authStore";
import {decodeJwt, JwtPayload} from "@/helpers/jwt";

interface ProtectedProps {
	children: React.ReactNode;
	requiredPermission?: string;
	requiredRole?: string;
}

export default function Protected({children, requiredPermission, requiredRole, }: ProtectedProps) {
	const router = useRouter();
	const {isAuthenticated, token} = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);
	const [isStoreReady, setIsStoreReady] = useState(false);

	useEffect(() => {
		setIsStoreReady(true);
	}, []);


	useEffect(() => {
		if (!isStoreReady) return;

		if (!isAuthenticated || !token) {
			debugger
			router.push("/auth/login");
			return;
		}

		const verifyAccess = () => {
			try {
				const payload: JwtPayload = decodeJwt(token);
				const {roles = [], permissions = []} = payload;

				if (requiredPermission && !permissions.includes(requiredPermission)) {
					console.warn(`Falta permiso: ${requiredPermission}`);
					router.push("/no-access");
					return;
				}

				if (requiredRole && !roles.includes(requiredRole)) {
					console.warn(`Falta rol: ${requiredRole}`);
					router.push("/no-access");
					return;
				}

				setHasAccess(true);
			} catch (error) {
				console.error("Error al decodificar el token:", error);
				debugger
				router.push("/auth/login");
			} finally {
				setIsLoading(false);
			}
		};

		verifyAccess();
	}, [isStoreReady,
		isAuthenticated,
		token,
		requiredPermission,
		requiredRole,
		router,
	]);

	if (isLoading) {
		return <p>Cargando acceso…</p>;
	}

	if (!hasAccess) {
		return <p>Verificando acceso…</p>;
	}

	return <>{children}</>;
}
