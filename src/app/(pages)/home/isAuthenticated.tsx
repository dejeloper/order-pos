'use client';

import {useEffect, useState} from "react";
import {useAuthStore} from "@/stores/authStore";

export default function IsAuthenticated() {
	const {isAuthenticated, syncCookieToState} = useAuthStore();
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		syncCookieToState();
	}, [syncCookieToState]);

	if (!isClient) return null;

	return (
		<p>{isAuthenticated ? "Autenticado" : "Sin usuario"}</p>
	);
}
