import setCookieParser from "set-cookie-parser";
import { cookies } from "next/headers";

export const proxyServerCookies = async function (response: Response) {
  if (response.headers.has("set-cookie")) {
    const cookieHeader = response.headers.get("set-cookie");
    const parsedCookies = setCookieParser.parse(cookieHeader, { map: true });

    const cookieStore = cookies();

    for (const [name, cookie] of Object.entries(parsedCookies)) {
      cookieStore.set(name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        maxAge: cookie.maxAge,
      });
    }
  }
};
