import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenManager";

export async function apiClient(path: string, options: RequestInit = {}) {
  const token = getAccessToken();

  // ⭐ We use Record<string, string> to allow assigning Authorization safely
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // ...(options.headers as Record<string, string> || {}),
  };

  // ⭐ Add access token from memory
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(path, {
    ...options,
    // headers,
    // credentials: "include", // Required for refreshToken on server
  });

  // If access token expired → refresh
  // if (res.status === 401) {
  //   const refreshed = await refreshAccessToken();

  //   if (!refreshed) {
  //     clearAccessToken();
  //     return res; // return original response (unauthorized)
  //   }

  //   // ⭐ Retry original request with NEW token
  //   const newToken = getAccessToken();

  //   const retryHeaders: Record<string, string> = {
  //     "Content-Type": "application/json",
  //     ...(options.headers as Record<string, string> || {}),
  //   };

  //   if (newToken) {
  //     retryHeaders["Authorization"] = `Bearer ${newToken}`;
  //   }

  //   res = await fetch(path, {
  //     ...options,
  //     headers: retryHeaders,
  //     credentials: "include",
  //   });
  // }

  return res;
}


// ==========================
//      TOKEN REFRESH
// ==========================
export async function refreshAccessToken() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include", // ⭐ sends refreshToken cookie
    });

    const data = await res.json();

    if (!data.Status) {
      clearAccessToken();
      return false;
    }

    // ⭐ Save new access token to memory
    setAccessToken(data.Token);

    return true;

  } catch (err) {
    clearAccessToken();
    return false;
  }
}
