import { BASE_URL, User } from "./user";

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

  if(!res.ok) {
    throw new Error("Failed to login");
  }

  const data = await res.json();
  return data as SessionData;
};
