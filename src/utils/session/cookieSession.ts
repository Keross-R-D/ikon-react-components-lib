import Cookies from 'js-cookie';

const cookiePrefix = "ikoncloud_next_";

export interface CookieSessionOptionsProps {
  maxAge?: number,
  expires?: Date
}

export function setCookieSession(
  sessionName: string,
  data: string,
  options?: CookieSessionOptionsProps
) {
  // js-cookie only supports 'expires' (in days or Date)
  let expires: number | Date | undefined = options?.expires;
  if (!expires && options?.maxAge) {
    // Convert maxAge (seconds) to days for js-cookie
    expires = options.maxAge / 86400;
  }
  Cookies.set(cookiePrefix + sessionName, data, {
    httpOnly: false,
    sameSite: "lax",
    expires
  });
}

export function getCookieSession(
  sessionName: string
): string | undefined {
  const cookie = Cookies.get(cookiePrefix + sessionName);
  return cookie;
}

export function clearCookieSession(sessionName: string) {
  Cookies.remove(cookiePrefix + sessionName);
}

export async function clearAllCookieSession() {
  // const cookieStore = await cookies();
  // cookieStore.getAll().forEach((cookie) => {
  //   if (cookie.name.startsWith(cookiePrefix)) {
  //     cookieStore.delete(cookie.name);
  //   }
  // });

}

//old
// // import { cookies } from "next/headers";
// import Cookies from "js-cookie";

// const cookiePrefix = "ikoncloud_next_";

// export interface CookieSessionOptionsProps {
//   maxAge?: number;
//   expires?: Date;
// }

// export async function setCookieSession(
//   sessionName: string,
//   data: string,
//   options?: CookieSessionOptionsProps,
// ) {
//   // const cookieStore = await cookies();

//   // cookieStore.set(cookiePrefix + sessionName, data, {
//   //   httpOnly: true,
//   //   sameSite: "lax",
//   //   secure: process.env.NODE_ENV === "production",
//   //   path: "/",
//   //   domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
//   //   expires: options?.expires,
//   //   maxAge: options?.maxAge,
//   // });

//   Cookies.set(cookiePrefix + sessionName, data, {
//     httpOnly: false,
//     sameSite: "lax",
//     secure: window.location.protocol === "https:",
//     path: "/",
//     domain: import.meta.env.NEXT_PUBLIC_COOKIE_DOMAIN,
//     expires: options?.expires ?? 7, // default 7 days
//   });
// }

// export function getCookieSession(
//   sessionName: string,
// ): string | undefined{
//   // const cookieStore = await cookies();
//   const cookie = Cookies.get(cookiePrefix + sessionName);
//   return cookie;
// }

// export async function clearCookieSession(sessionName: string) {
//   // const cookieStore = await cookies();
//   Cookies.remove(cookiePrefix + sessionName);
// }

// export async function clearAllCookieSession() {
//   // const cookieStore = await cookies();
//   // cookieStore.getAll().forEach((cookie) => {
//   //   if (cookie.name.startsWith(cookiePrefix)) {
//   //     cookieStore.delete(cookie.name);
//   //   }
//   // });
// }
