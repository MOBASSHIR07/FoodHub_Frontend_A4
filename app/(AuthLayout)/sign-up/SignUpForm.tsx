"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// 1. Zod Schema
const registerSchema = z.object({
  fullName: z.string()
    .min(1, "Name is required")
    .min(4, "Minimum 4 characters")
    .refine((val) => !/\d/.test(val), "Numbers not allowed"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "One uppercase required")
    .regex(/[0-9]/, "One number required"),
});

export default function SignUpForm() {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User...");
      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.fullName,
          callbackURL: "/", 
        });

        if (error) {
          toast.error(error.message || "Failed to create account", { id: toastId });
          return;
        }

        toast.success("User Created Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong!", { id: toastId });
      }
    },
  });

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Create Account</h1>
        <p className="text-gray-500 font-medium">Join FoodHub and start your journey.</p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Full Name Field using Render Props */}
        <form.Field
          name="fullName"
          validators={{ onChange: registerSchema.shape.fullName }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Full Name</Label>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="John Doe"
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 ml-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{ onChange: registerSchema.shape.email }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Email</Label>
              <Input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="john@gmail.com"
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
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
          validators={{ onChange: registerSchema.shape.password }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-semibold ml-1">Password</Label>
              <Input
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••••"
                className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-xs text-red-500 ml-1">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full h-11 rounded-xl bg-gray-900 hover:bg-orange-600 text-white font-bold transition-all"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>
          )}
        </form.Subscribe>

        <p className="text-center text-sm font-medium text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-orange-600 font-black hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}