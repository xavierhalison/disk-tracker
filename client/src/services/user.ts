export type User = {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export const BASE_URL = "http://localhost:3001";

export const getCurrentUser = async (): Promise<User | null> => {
  const res = await fetch(`${BASE_URL}/user`, { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
};