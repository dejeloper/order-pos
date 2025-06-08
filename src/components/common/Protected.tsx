'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {usePathname} from 'next/navigation'

import {decodeJwt, JwtPayload} from "@/helpers/jwt";
import {useAuthStore} from "@/stores/authStore";
import {useErrorStore} from "@/stores/errorStore";
import FullPageLoader from "./FullPageLoader";
import toast from "react-hot-toast";

interface ProtectedProps {
	children: React.ReactNode;
	requiredPermission?: string;
	requiredRole?: string;
	onlyRender?: boolean;
}

export default function Protected({children, requiredPermission, requiredRole, onlyRender = false}: ProtectedProps) {
	const router = useRouter();
	const {isAuthenticated, token} = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);
	const [hasAccess, setHasAccess] = useState(false);
	const [isStoreReady, setIsStoreReady] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsStoreReady(true);
	}, []);

	useEffect(() => {
		if (!isStoreReady) return;

		if (!isAuthenticated || !token) {
			router.push("/auth/login");
			setIsLoading(false);
			return;
		}

		const verifyAccess = () => {
			try {
				const payload: JwtPayload = decodeJwt(token);
				const {role = '', permissions = []} = payload;

				if (!requiredPermission && !requiredRole) {
					setHasAccess(false);
					useErrorStore.getState().setError("El componente requiere al menos 1 permiso o 1 rol.", pathname);
					toast.error("Acceso denegado. El componente requiere al menos 1 permiso o 1 rol.");
					router.push("/no-access");
					return;
				}

				if (requiredPermission && !permissions.includes(requiredPermission)) {
					if (!onlyRender) {
						useErrorStore.getState().setError(`Falta permiso: ${requiredPermission}`, pathname);
						toast.error(`Acceso denegado. Falta permiso: ${requiredPermission}`);
						router.push("/no-access");
					}
					return;
				}

				if (requiredRole) {
					const requiredRoles = requiredRole.split(",").map(r => r.trim());
					const hasAnyRole = requiredRoles.includes(role);
					if (!hasAnyRole) {
						if (!onlyRender) {
							useErrorStore.getState().setError(`Falta rol: ${requiredRole}`, pathname);
							toast.error(`Acceso denegado. Falta rol: ${requiredRole}`);
							router.push("/no-access");
						}
						return;
					}
				}

				setHasAccess(true);
			} catch (error) {
				console.error("Error al decodificar el token:", error);
				useErrorStore.getState().setError("Error al verificar el acceso. Por favor, inicia sesión nuevamente.", pathname);
				toast.error("Error al verificar el acceso. Por favor, inicia sesión nuevamente.");
				setHasAccess(false);
				if (onlyRender) router.push("/auth/login");
			} finally {
				setIsLoading(false);
			}
		};

		verifyAccess();
	}, [
		isStoreReady,
		isAuthenticated,
		token,
		requiredPermission,
		requiredRole,
		router,
		pathname,
		onlyRender
	]);

	if (isLoading) {
		return <FullPageLoader message="Cargando acceso…" />;
	}

	if (!hasAccess) {
		if (onlyRender) return null;
		return <FullPageLoader message="Verificando acceso…" />;
	}

	return <>{children}</>;
}
