import { cookies } from "next/headers";

export type User = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export const BASE_URL = "http://localhost:3001";

export const getCurrentUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const res = await fetch(`${BASE_URL}/user`, {
    credentials: "include",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) return null;
  return res.json();
};
