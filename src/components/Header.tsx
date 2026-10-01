"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, LogIn, UserPlus, LogOut, User } from "lucide-react";

export function Header() {
  const { user, signOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              TechPulse
            </span>
            <span className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wide">
              Premium Store
            </span>
          </div>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 py-1.5 px-3 rounded-lg">
                <User className="h-4 w-4 text-indigo-400 shrink-0" />
                <Link
                  href="/account"
                  data-testid="user-email"
                  className="text-sm font-medium text-slate-200 hover:text-indigo-400 transition-colors"
                >
                  {user.email}
                </Link>
              </div>

              <Button
                variant="outline"
                data-testid="btn-logout"
                onClick={handleLogout}
                className="border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all"
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium text-sm transition-all"
              >
                <Link href="/login" data-testid="btn-login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </Button>

              <Button
                asChild
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-md shadow-indigo-600/25 transition-all"
              >
                <Link href="/register" data-testid="btn-register" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
