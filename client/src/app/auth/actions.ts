import { loginUser } from "../../services/auth";

export async function login(formData: FormData) {
  "use server";
  const email = formData.get("email") + "";
  const password = formData.get("password") + "";

  await loginUser(email, password);
  // return user;
}