import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

const API: Record<string, Function> = {};

API.get = async function <T>(url: string): Promise<T> {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

API.post = async function <T>(url: string, data: T): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  return res.json();
};

const proxyServerCookies = async (response: Response) => {
  const cookieHeader = response.headers.get("set-cookie");
  const parsedCookies = setCookieParser.parse(cookieHeader);
  const cookieStore = await cookies();

  for (const cookie of parsedCookies) {
    const { name, value, ...options } = cookie;
    cookieStore.set(name, value, { ...(options as ResponseCookie) });
  }
};

export default API;
