'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {usePathname} from 'next/navigation'

import {decodeJwt, JwtPayload} from "@/helpers/jwt";
import {useAuthStore} from "@/stores/authStore";
import {useErrorStore} from "@/stores/errorStore";

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
	const pathname = usePathname()

	useEffect(() => {
		setIsStoreReady(true);
	}, []);


	useEffect(() => {
		if (!isStoreReady) return;

		if (!isAuthenticated || !token) {
			router.push("/auth/login");
			return;
		}

		const verifyAccess = () => {
			try {
				const payload: JwtPayload = decodeJwt(token);
				const {role = '', permissions = []} = payload;


				if (!requiredPermission && !requiredRole) {
					setHasAccess(false);
					useErrorStore.getState().setError("El componente requiere al menos 1 permiso o 1 rol.", pathname);
					router.push("/no-access");
					return;
				}

				if (requiredPermission && !permissions.includes(requiredPermission)) {
					useErrorStore.getState().setError(`Falta permiso: ${requiredPermission}`, pathname);
					router.push("/no-access");
					return;
				}

				if (requiredRole) {
					const requiredRoles = requiredRole.split(",").map(r => r.trim());
					const hasAnyRole = requiredRoles.includes(role);
					if (!hasAnyRole) {
						useErrorStore.getState().setError(`Falta rol: ${requiredRole}`, pathname);
						router.push("/no-access");
						return;
					}
				}

				setHasAccess(true);
			} catch (error) {
				console.error("Error al decodificar el token:", error);
				useErrorStore.getState().setError("Error al verificar el acceso. Por favor, inicia sesión nuevamente.", pathname);
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
		pathname
	]);

	if (isLoading) {
		return <p>Cargando acceso…</p>;
	}

	if (!hasAccess) {
		return <p>Verificando acceso…</p>;
	}

	return <>{children}</>;
}
