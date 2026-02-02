import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";

export default async function SignInPage() {
  const session = await userService.getSession();

  if (session) {
    redirect("/");
  }

  return <SignInForm />;
}