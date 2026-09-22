import { BASE_URL, User } from "./user";
import { parseSetCookie } from "set-cookie-parser";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect, RedirectType } from "next/navigation";

export type SessionData = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }

  await proxyServerCookies(res);
  redirect("/", RedirectType.replace);
};

const proxyServerCookies = async (response: Response) => {
  const cookieHeader = response.headers.get("set-cookie");
  const parsedCookies = parseSetCookie(cookieHeader);
  const cookieStore = await cookies();

  for (const cookie of parsedCookies) {
    const { name, value, ...options } = cookie;
    cookieStore.set(name, value, { ...(options as ResponseCookie) });
  }
};
