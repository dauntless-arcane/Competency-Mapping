import { getAccessToken, clearAccessToken } from "./tokenManager";
// import { hydrateAccessToken } from "./hydrate";

export async function apiClient(path: string, options: RequestInit = {}) {
  // 1) Try to hydrate access token (from refresh cookie)
  // await hydrateAccessToken();

  let token = getAccessToken();
  console.log("Current Access Token:", token);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // ---- FIRST REQUEST ----
  let res = await fetch(path, {
    ...options,
    headers,
    credentials: "include",
  });

  // ---- FIRST 401 (TOKEN EXPIRED) ----
  if (res.status === 401) {
    console.warn("⚠ First 401 detected → refreshing token...");

    // const refreshed = await hydrateAccessToken();

    // If refresh failed → force logout
    // if (!refreshed) {
    //   console.error("❌ Refresh failed — forcing logout");
    //   handleForceLogout();
    //   return res;
    // }

    // Retry with new token
    const newToken = getAccessToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
    }

    // ---- SECOND REQUEST ----
    res = await fetch(path, {
      ...options,
      headers,
      credentials: "include",
    });

    // ---- SECOND 401 AGAIN → INVALID ACCOUNT ----
    if (res.status === 401) {
      console.error("❌ Second 401 → invalid session. Redirecting to login...");
      handleForceLogout();
      return res;
    }
  }

  return res;
}

/** FORCE LOGOUT + REDIRECT USER */
function handleForceLogout() {
  clearAccessToken();              // clear memory token
  sessionStorage.removeItem("user");

  if (typeof window !== "undefined") {
    window.location.href = "/auth/login";   // redirect to login
  }
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
