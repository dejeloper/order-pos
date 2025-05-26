interface LoginResponse {
	token: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL_LOGIN = `${API_URL}/login`;

export async function loginService({username, password}: {username: string; password: string}) {
	try {
		const res = await fetch(`${API_URL_LOGIN}`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({username, password}),
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => null);
			const message = errorData?.message || "Usuario o contraseña incorrectos";
			throw new Error(message);
		}

		const data: LoginResponse = await res.json();

		if (!data.token) {
			throw new Error("No se recibió un token de autenticación");
		}

		return data;
	} catch (error: unknown) {
		if (error && typeof error === "object" && "message" in error) {
			throw new Error((error as {message?: string}).message || "Error en el servicio de login");
		}
		throw new Error("Error en el servicio de login");
	}
}
