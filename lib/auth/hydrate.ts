// import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenManager";

// let hydrated = false;

// export async function hydrateAccessToken() {
//   if (hydrated && getAccessToken()) return true;

//   hydrated = true;

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();

//     console.log("🔥 hydrate refresh response:", data);

//     if (!data.Status || !data.Token) {
//       clearAccessToken();
//       return false;
//     }

//     setAccessToken(data.Token);

//     console.log("🔥 token set during hydration:", getAccessToken());

//     return true;
//   } catch (err) {
//     clearAccessToken();
//     return false;
//   }
// }
