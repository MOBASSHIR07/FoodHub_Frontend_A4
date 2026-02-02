"use client";

import Link from "next/link";
import { Squirrel, Github, Chrome, Mail, Lock, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signInUserAction } from "@/actions/auth.action";

const loginSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");


      const result = await signInUserAction(value);

      if (!result.success) {
        toast.error(result.message, { id: toastId });
        return;
      }

      toast.success("Login successful!", { id: toastId });

      // 2. Hard reload to /dashboard

      window.location.href = "/dashboard";

      toast.success("Welcome back!", { id: toastId });

    },
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg">
          <Squirrel className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Welcome back</h1>
        <p className="text-sm font-medium text-slate-500 font-semibold">Sign in to FoodHub</p>
      </div>

      <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50">
        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="outline" className="rounded-xl h-11 border-slate-200 font-bold" onClick={() => authClient.signIn.social({ provider: 'google' })}>
            <Chrome className="h-4 w-4 text-red-500 mr-2" /> Google
          </Button>
          <Button variant="outline" className="rounded-xl h-11 border-slate-200 font-bold" onClick={() => authClient.signIn.social({ provider: 'github' })}>
            <Github className="h-4 w-4 mr-2" /> Github
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
            <span className="bg-white px-3">Or email</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="email" validators={{ onChange: loginSchema.shape.email }}>
            {(field) => (
              <div className="space-y-1">
                <Label className="text-sm font-bold ml-1 text-slate-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="name@example.com"
                    className="pl-12 h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-[10px] font-bold text-red-500 ml-2 uppercase">{(field.state.meta.errors[0])?.message}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="password" validators={{ onChange: loginSchema.shape.password }}>
            {(field) => (
              <div className="space-y-1">
                <div className="flex justify-between px-1">
                  <Label className="text-sm font-bold text-slate-700">Password</Label>
                  <Link href="#" className="text-xs font-bold text-orange-600 hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 h-11 rounded-xl border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-11 rounded-xl font-black bg-slate-900 hover:bg-orange-600 text-white shadow-lg mt-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>

      <p className="text-center text-sm font-medium text-slate-500">
        New here? <Link href="/sign-up" className="font-bold text-orange-600 hover:underline">Create account</Link>
      </p>
    </div>
  );
}