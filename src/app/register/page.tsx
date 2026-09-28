"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { UserPlus, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateName = (val: string): string | undefined => {
    if (!val.trim()) {
      return "Full name is required";
    }
    return undefined;
  };

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
    if (val.length < 6) {
      return "Password must be at least 6 characters";
    }
    return undefined;
  };

  const validateConfirmPassword = (val: string, passVal: string): string | undefined => {
    if (!val) {
      return "Confirm password is required";
    }
    if (val !== passVal) {
      return "Passwords do not match";
    }
    return undefined;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (errors.name) {
      const err = validateName(val);
      setErrors((prev) => {
        const next = { ...prev };
        if (!err) delete next.name;
        else next.name = err;
        return next;
      });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) {
      const err = validateEmail(val);
      setErrors((prev) => {
        const next = { ...prev };
        if (!err) delete next.email;
        else next.email = err;
        return next;
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password) {
      const err = validatePassword(val);
      setErrors((prev) => {
        const next = { ...prev };
        if (!err) delete next.password;
        else next.password = err;
        return next;
      });
    }
    // Also revalidate confirm password if it already has an error
    if (errors.confirmPassword) {
      const confirmErr = validateConfirmPassword(confirmPassword, val);
      setErrors((prev) => {
        const next = { ...prev };
        if (!confirmErr) delete next.confirmPassword;
        else next.confirmPassword = confirmErr;
        return next;
      });
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (errors.confirmPassword) {
      const err = validateConfirmPassword(val, password);
      setErrors((prev) => {
        const next = { ...prev };
        if (!err) delete next.confirmPassword;
        else next.confirmPassword = err;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(confirmPassword, password);

    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passwordErr) newErrors.password = passwordErr;
    if (confirmPasswordErr) newErrors.confirmPassword = confirmPasswordErr;

    setErrors(newErrors);

    if (!nameErr && !emailErr && !passwordErr && !confirmPasswordErr) {
      setSuccessMessage("Registration successful (demo)");
    } else {
      setSuccessMessage("");
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
            <UserPlus className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">
            Create an Account
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {successMessage && (
            <div
              data-testid="form-success"
              className="mb-6 flex items-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-medium text-emerald-400 shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form
            data-testid="register-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
          >
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <Label htmlFor="register-name" className="text-slate-300 text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="register-name"
                type="text"
                placeholder="Nguyen Van A"
                data-testid="register-name"
                value={name}
                onChange={handleNameChange}
                className="bg-slate-950/60 border-slate-800 focus-visible:ring-indigo-500 text-slate-100 placeholder:text-slate-500"
              />
              {errors.name && (
                <p
                  data-testid="error-name"
                  className="flex items-center gap-1.5 text-xs text-rose-400 mt-1"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="register-email" className="text-slate-300 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="register-email"
                type="email"
                placeholder="name@example.com"
                data-testid="register-email"
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
              <Label htmlFor="register-password" className="text-slate-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="register-password"
                type="password"
                placeholder="At least 6 characters"
                data-testid="register-password"
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

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <Label htmlFor="register-confirm-password" className="text-slate-300 text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="register-confirm-password"
                type="password"
                placeholder="Re-enter your password"
                data-testid="register-confirm-password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="bg-slate-950/60 border-slate-800 focus-visible:ring-indigo-500 text-slate-100 placeholder:text-slate-500"
              />
              {errors.confirmPassword && (
                <p
                  data-testid="error-confirm-password"
                  className="flex items-center gap-1.5 text-xs text-rose-400 mt-1"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              data-testid="register-submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 shadow-lg shadow-indigo-600/30 transition-all mt-2"
            >
              Create Account
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-400 border-t border-slate-800/60 pt-4">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
