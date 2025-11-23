import { NextResponse } from "next/server";
import { refreshAccessToken } from "./lib/auth/apiClient";
import { clearAccessToken } from "./lib/auth/tokenManager";

export async function proxy(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // If route is /auth/* → allow
  if (path.startsWith("/auth")) {
    return NextResponse.next();
  }

  // Try refresh flow (proxy cannot read memory tokens)
  const refreshed = await refreshAccessToken();

  if (refreshed) {
    return NextResponse.next(); // authentication OK
  }

  // Refresh failed → block
  clearAccessToken();
  return new NextResponse("Forbidden: Authentication failed", {
    status: 403,
  });
}
