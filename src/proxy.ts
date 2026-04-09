import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	const { pathname } = request.nextUrl;

	if (sessionCookie && pathname === "/login") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (!sessionCookie && pathname.startsWith("/dashboard")) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login"],
};
