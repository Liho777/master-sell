import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const protectedRoutes = ["/dashboard", "/generate"];
  const isProtected = protectedRoutes.some((route) =>
    url.pathname.startsWith(route),
  );

  if (isProtected) {
    const user = await getCurrentUser();
    if (!user) {
      return Response.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
