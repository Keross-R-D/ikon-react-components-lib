import { clearCookieSession, getCookieSession, setCookieSession } from "../session/cookieSession";
import type { TokenResponse } from "./types";
import { getConfig } from "../config";
interface AccessTokenOptionsProps {
  isSetToken?: boolean
}
export async function getValidAccessToken(options?: AccessTokenOptionsProps): Promise<string | null> {
  const accessToken = getCookieSession("accessToken");
  const refreshToken = getCookieSession("refreshToken");

  if (accessToken) {
    return accessToken;
  }

  if (refreshToken) {
    // Refresh token is valid, call the refresh token API
    const newAccessToken = await refreshAccessToken(refreshToken, options?.isSetToken);
    if (newAccessToken) {
      return newAccessToken; // Return the new access token
    }
  }
  // If both tokens are invalid, return null
  return null;
}

export async function refreshAccessToken(
  refreshToken: string,
  isSetToken?: boolean
): Promise<string | null> {
  try {
    // Replace this with your actual API call to refresh the token
    const response = await fetch(
      `${getConfig().IKON_AUTH_API_URL}/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (response.ok) {
      const jsonData: unknown = await response.json();

      // Optionally, add runtime validation here if needed
      const data = jsonData as TokenResponse;

      const { accessToken, refreshToken, expiresIn, refreshExpiresIn } = data;
      if (isSetToken == undefined || isSetToken) {
        try {
          setCookieSession("accessToken", accessToken, { maxAge: expiresIn });
          setCookieSession("refreshToken", refreshToken, { maxAge: refreshExpiresIn });
        } catch (error) {
          console.error(error)
        }
      }
      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh access token:", error);
  }

  return null;
}

export function clearTokensAndLogout() {
  clearCookieSession("accessToken");
  clearCookieSession("refreshToken");
  if (typeof window !== "undefined") {
    window.location.href = getConfig().LOGIN_PAGE_URL;
  }
}

//old
// // import { redirect } from "next/navigation";
// import {
//   clearAllCookieSession,
//   getCookieSession,
//   setCookieSession,
// } from "../session/cookieSession";
// import { type TokenResponse } from "./types";
// import { jwtDecode } from "jwt-decode";

// interface AccessTokenOptionsProps {
//   isNotLogOutWhenExpire?: boolean;
//   platformUrl?: string;
//   isSetToken?: boolean;
// }

// // Prevent multiple refresh calls at once
// let refreshPromise: Promise<string | null> | null = null;

// export async function getValidAccessToken(
//   baseUrl: string,
//   options?: AccessTokenOptionsProps,
// ): Promise<string | null> {
//   const accessToken = getCookieSession("accessToken");

//   console.log("Access Token....:");
//   const refreshToken = getCookieSession("refreshToken");

//   console.log("Refresh Token...");

//   console.log(
//     "Before Return Access Token:...............................................",
//   );
//   if (accessToken) return accessToken;

//   console.log(
//     "After Return Access Token:...............................................",
//   );

//   if (refreshToken) {
//     console.log("Refreshing access token using refresh token...", refreshToken);
//     if (!refreshPromise) {
//       refreshPromise = refreshAccessToken(
//         refreshToken,
//         baseUrl,
//         options?.isSetToken,
//       );
//       refreshPromise.finally(() => (refreshPromise = null));
//     }
//     return await refreshPromise;
//   }

//   if (!options?.isNotLogOutWhenExpire && options?.platformUrl) {
//     await logOut(options?.platformUrl);
//   }

//   return null;
// }

// export async function refreshAccessToken(
//   refreshToken: string,
//   baseUrl: string,
//   isSetToken?: boolean,
// ): Promise<string | null> {
//   try {
//     console.log("Refreshing access token...");

//     const response = await fetch(`${baseUrl}/platform/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refreshToken }),
//     });

//     console.log("Refresh Token API Response:", response.status);

//     if (!response.ok) return null;

//     const {
//       accessToken,
//       refreshToken: newRefreshToken,
//       expiresIn,
//       refreshExpiresIn,
//     }: TokenResponse = await response.json();

//     //  Always set new access token
//     await setCookieSession("accessToken", accessToken, {
//       maxAge: expiresIn,
//     });

//     //  IMPORTANT: Save the rotated refresh token
//     if (newRefreshToken) {
//       await setCookieSession("refreshToken", newRefreshToken, {
//         maxAge: refreshExpiresIn,
//       });
//       console.log("Refresh token rotated & updated.");
//     }

//     console.log(" Access token refreshed successfully.");
//     return accessToken;
//   } catch (error) {
//     console.error("Failed to refresh access token:", error);
//     return null;
//   }
// }

// export async function decodeAccessToken(baseUrl: string) {
//   const accessToken = await getValidAccessToken(baseUrl);
//   return accessToken ? jwtDecode(accessToken) : null;
// }

// export async function logOut(platformUrl: string) {
//   await clearAllCookieSession();
//   console.log("Logging out...");
//   // redirect(`${platformUrl}/login.html`);
// }
