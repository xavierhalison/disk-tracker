import { getCurrentUser, User } from "../services/user";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  let user: User = null;

  try {
    user = await getCurrentUser();
  } catch (err) {
    console.error(err);
    return <div>error</div>;
  }

  if (!user) {
    redirect("/auth/login", RedirectType.replace);
  }

  return <div>home</div>;
}
