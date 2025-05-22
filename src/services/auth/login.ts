interface LoginResponse {
	token: string;
}

export async function loginService({username, password}: {username: string; password: string}) {
	try {
		const res = await fetch("http://localhost:8000/api/login", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({username, password}),
		});

		if (!res.ok) {
			throw new Error("Usuario o contraseña incorrectos");
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
