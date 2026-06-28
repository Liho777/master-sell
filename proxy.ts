import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

function parseRequestCookies(header: string | null): { name: string; value: string }[] {
  if (!header) return [];
  return header.split(";").map((cookie) => {
    const [rawName, ...rawValue] = cookie.trim().split("=");
    return {
      name: decodeURIComponent(rawName.trim()),
      value: rawValue.length > 0 ? decodeURIComponent(rawValue.join("=").trim()) : "",
    };
  });
}

export async function proxy(request: Request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseRequestCookies(request.headers.get("cookie"));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = new URL(request.url);
  const protectedRoutes = ["/dashboard", "/generate"];
  const isProtected = protectedRoutes.some((route) =>
    url.pathname.startsWith(route),
  );

  if (isProtected && !user) {
    return Response.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
