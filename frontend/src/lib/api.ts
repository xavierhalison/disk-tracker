import API from "../config/apiClient";

type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginPayload = Omit<RegisterPayload, "confirmPassword">;

export const register = async (payload: RegisterPayload) =>
  API.post("/auth/register", payload);

export const login = async (payload: LoginPayload) =>
  API.post("/auth/login", payload);
