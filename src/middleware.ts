import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {jwtVerify} from "jose";

export async function middleware(request: NextRequest) {
	const {pathname} = request.nextUrl;

	const PUBLIC_ROUTES = ["/auth/login", "/auth/logout"];

	if (PUBLIC_ROUTES.includes(pathname)) {
		return NextResponse.next();
	}

	const token = request.cookies.get("auth_token")?.value;
	if (!token) {
		debugger
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		await jwtVerify(token, secret);

		return NextResponse.next();
	} catch (error) {
		console.error("Error al verificar JWT:", error);
		debugger
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|auth/.*).*)",
	],
};