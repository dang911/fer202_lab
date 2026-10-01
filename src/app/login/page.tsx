"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (val: string): string | undefined => {
    if (!val.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(val)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePassword = (val: string): string | undefined => {
    if (!val) {
      return "Password is required";
    }
    return undefined;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setAuthError("");
    if (errors.email) {
      const err = validateEmail(val);
      setErrors((prev) => {
        const next = { ...prev };
        if (!err) {
          delete next.email;
        } else {
          next.email = err;
        }
        return next;
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    setAuthError("");
    if (errors.password) {
      const err = validatePassword(val);
      setErrors((prev) => {
        const next = { ...prev };
        if (!err) {
          delete next.password;
        } else {
          next.password = err;
        }
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    const newErrors: { email?: string; password?: string } = {};
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;

    setErrors(newErrors);
    setAuthError("");

    if (emailErr || passwordErr) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await signIn(email, password);

      if (error) {
        setAuthError(error.message);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setAuthError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ambient-bg min-h-screen flex flex-col justify-center items-center px-4 py-12">
      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Products</span>
        </Link>
      </div>

      <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {authError && (
            <div
              data-testid="error-auth"
              className="mb-6 flex items-center gap-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-sm font-medium text-rose-400 shadow-sm"
            >
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form
            data-testid="login-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-slate-300 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                data-testid="login-email"
                value={email}
                onChange={handleEmailChange}
                className="bg-slate-950/60 border-slate-800 focus-visible:ring-indigo-500 text-slate-100 placeholder:text-slate-500"
              />
              {errors.email && (
                <p
                  data-testid="error-email"
                  className="flex items-center gap-1.5 text-xs text-rose-400 mt-1"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <Label htmlFor="login-password" className="text-slate-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                data-testid="login-password"
                value={password}
                onChange={handlePasswordChange}
                className="bg-slate-950/60 border-slate-800 focus-visible:ring-indigo-500 text-slate-100 placeholder:text-slate-500"
              />
              {errors.password && (
                <p
                  data-testid="error-password"
                  className="flex items-center gap-1.5 text-xs text-rose-400 mt-1"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              data-testid="login-submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 shadow-lg shadow-indigo-600/30 transition-all mt-2 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-400 border-t border-slate-800/60 pt-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
