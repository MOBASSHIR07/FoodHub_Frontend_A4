"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";

// 1. Zod Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function SignInForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // Using standard TanStack validation without the adapter
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Authenticating...");
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: "/", 
        });

        if (error) {
          toast.error(error.message || "Invalid credentials", { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong!", { id: toastId });
      }
    },
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 font-medium">Log in to your account.</p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Email Field with Render Props */}
        <form.Field
          name="email"
          validators={{ onChange: loginSchema.shape.email }}
        >
          {(field) => (
            <div className="space-x-2.5">
              <Label className="text-sm font-semibold ml-1">Email Address</Label>
              <div className="relative flex items-center ">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400  " />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="john@example.com"
                  className="pl-10  flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 ml-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password Field */}
        <form.Field
          name="password"
          validators={{ onChange: loginSchema.shape.password }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 ml-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full h-11 rounded-xl bg-gray-900 hover:bg-orange-600 text-white font-bold transition-all shadow-lg active:scale-95 mt-2"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> Sign In
                </div>
              )}
            </Button>
          )}
        </form.Subscribe>

        <div className="text-center mt-6">
          <p className="text-sm font-medium text-gray-500">
            Donot have an account?{" "}
            <Link href="/sign-up" className="text-orange-600 font-black hover:underline underline-offset-4">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}