"use client";

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { User, Mail, ShieldCheck, Calendar, ArrowLeft, LogOut } from "lucide-react";

export default function AccountPage() {
  const { user, loading, signOut } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="ambient-bg min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="ambient-bg min-h-screen flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Account Page Container */}
        <div
          data-testid="account-page"
          className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-8"
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                  <User className="h-8 w-8 text-indigo-400" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">User Profile</h1>
                <p className="text-sm text-slate-400">Manage your TechPulse account settings and credentials</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>Email Address</span>
              </div>
              <p
                data-testid="account-email"
                className="text-base sm:text-lg font-medium text-slate-100 break-all"
              >
                {user.email}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Account Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-base sm:text-lg font-medium text-slate-100">
                  Active & Authenticated
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Calendar className="h-4 w-4 text-indigo-400" />
                <span>User ID</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-400 break-all">
                {user.id}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Calendar className="h-4 w-4 text-indigo-400" />
                <span>Last Sign In</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : "Current Session"}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 TechPulse Inc. Lab 3 Demonstration. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-slate-200 transition-colors">Products</Link>
            <Link href="/account" className="hover:text-slate-200 transition-colors">Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
