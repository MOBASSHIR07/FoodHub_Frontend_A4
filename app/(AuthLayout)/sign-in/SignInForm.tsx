"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, Mail, Lock, User, ShoppingBasket, Store } from "lucide-react";
import { signUpUserAction, type RegisterInput } from "@/actions/auth.action";
import { useRouter } from "next/navigation";


const registerSchema = z.object({
  fullName: z.string().min(4, "Minimum 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Minimum 8 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
});

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "CUSTOMER" | "PROVIDER",
      phoneNumber: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      const result = await signUpUserAction(value as RegisterInput);

      if (!result.success) {
        toast.error(result.message, { id: toastId });
        return;
      }

      toast.success("Success! Please sign in.", { id: toastId });
      setTimeout(() => router.push("/sign-in"), 2000);
    },
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-black text-gray-900">Join FoodHub</h1>
        <p className="text-gray-500 font-medium">Create your account to get started.</p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {/* Role Selection */}
        <form.Field name="role">
          {(field) => (
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700">I want to...</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => field.handleChange("CUSTOMER")}
                  className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all font-bold text-sm ${
                    field.state.value === "CUSTOMER"
                      ? "border-orange-600 bg-orange-50 text-orange-600 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                  }`}
                >
                  <ShoppingBasket className="h-4 w-4" /> Order Food
                </button>
                <button
                  type="button"
                  onClick={() => field.handleChange("PROVIDER")}
                  className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all font-bold text-sm ${
                    field.state.value === "PROVIDER"
                      ? "border-orange-600 bg-orange-50 text-orange-600 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200"
                  }`}
                >
                  <Store className="h-4 w-4" /> Sell Food
                </button>
              </div>
            </div>
          )}
        </form.Field>

        {/* Full Name - Validated */}
        <form.Field 
            name="fullName" 
            validators={{ onChange: registerSchema.shape.fullName }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-bold text-gray-700 ml-1">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="John Doe"
                  className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-[10px] font-bold text-red-500 ml-2 uppercase">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Email - Validated */}
        <form.Field 
            name="email" 
            validators={{ onChange: registerSchema.shape.email }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-bold text-gray-700 ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="john@example.com"
                  className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-[10px] font-bold text-red-500 ml-2 uppercase">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Password - Validated */}
        <form.Field 
            name="password" 
            validators={{ onChange: registerSchema.shape.password }}
        >
          {(field) => (
            <div className="space-y-1">
              <Label className="text-sm font-bold text-gray-700 ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-[10px] font-bold text-red-500 ml-2 uppercase">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full h-12 rounded-xl bg-gray-900 hover:bg-orange-600 text-white font-black transition-all active:scale-95 shadow-lg mt-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Create Account"}
            </Button>
          )}
        </form.Subscribe>

        <div className="text-center mt-4">
          <p className="text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-orange-600 font-black hover:underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}