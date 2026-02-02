import { userService } from "@/service/user.service";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";


export default async function SignUpPage() {
  // 1. Check session on the server using your userService
  const session = await userService.getSession();

  // 2. If session exists, redirect to home or dashboard
  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full">
      {/* 3. Render the Client Component Form */}
      <SignUpForm />
    </div>
  );
}