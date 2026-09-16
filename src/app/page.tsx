"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [lastSubmitted, setLastSubmitted] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim() || !password.trim()) return;

    setStatus("loading");
    // Simulate UI feedback without backend authentication
    setTimeout(() => {
      setStatus("success");
      setLastSubmitted(identity);
    }, 900);
  };

  const handleFillDemo = (user: string, pass: string) => {
    setIdentity(user);
    setPassword(pass);
    setStatus("idle");
  };

  const resetStatus = () => {
    setStatus("idle");
    setLastSubmitted(null);
  };

  return (
    <main className="ambient-scene">
      <div className="glow-orb glow-orb-1" aria-hidden="true" />
      <div className="glow-orb glow-orb-2" aria-hidden="true" />

      <div className="login-wrapper">
        <section className="glass-card" aria-labelledby="login-heading">
          {/* Header */}
          <header className="card-header">
            <div className="logo-badge" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#auraGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 id="login-heading" className="card-title">
              Welcome back
            </h1>
            <p className="card-subtitle">
              Sign in to your account to continue
            </p>
            <div className="ui-badge">
              <span className="ui-badge-dot" />
              UI Preview Mode
            </div>
          </header>

          {/* Quick-fill Demo Helpers */}
          <div className="quick-fill-section">
            <span className="quick-fill-label">Quick fill demo credentials:</span>
            <div className="chip-container">
              <button
                type="button"
                className="demo-chip"
                onClick={() => handleFillDemo("alex.chen@enterprise.io", "DemoPass2026!")}
              >
                👤 alex.chen@enterprise.io
              </button>
              <button
                type="button"
                className="demo-chip"
                onClick={() => handleFillDemo("admin_super", "SuperSecureKey#9")}
              >
                ⚡ admin_super
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form
            id="login-form"
            className="login-form"
            onSubmit={handleSubmit}
            noValidate={false}
          >
            {/* Identity Field (Email or Username) */}
            <div className="form-group">
              <label htmlFor="login-identity" className="form-label">
                Email or Username
              </label>
              <div className="input-container">
                <input
                  id="login-identity"
                  name="identity"
                  type="text"
                  required
                  autoComplete="username"
                  value={identity}
                  onChange={(e) => {
                    setIdentity(e.target.value);
                    if (status === "success") setStatus("idle");
                  }}
                  placeholder="name@domain.com or username"
                  className="form-input"
                />
                <span className="input-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <a
                  href="#forgot-password"
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset instructions are a UI placeholder in this demo.");
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-container">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (status === "success") setStatus("idle");
                  }}
                  placeholder="Enter your password"
                  className="form-input password-input"
                />
                <span className="input-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <button
                  type="button"
                  id="toggle-password-btn"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="form-options">
              <label className="remember-label" htmlFor="remember-checkbox">
                <input
                  id="remember-checkbox"
                  type="checkbox"
                  className="custom-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Login Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={status === "loading"}
              className="submit-btn"
            >
              {status === "loading" ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Feedback / Success Notification */}
          {status === "success" && (
            <div className="feedback-banner success" role="status" aria-live="polite">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <p className="feedback-title">Login Verified (UI Demo)</p>
                <p className="feedback-desc">
                  Authenticated session ready for <strong>{lastSubmitted}</strong>. Credentials are valid for this preview.
                </p>
              </div>
              <button
                type="button"
                className="feedback-close"
                onClick={resetStatus}
                aria-label="Dismiss banner"
              >
                ✕
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="divider-row" aria-hidden="true">
            <span className="divider-line" />
            <span>or sign in with</span>
            <span className="divider-line" />
          </div>

          {/* Social Buttons */}
          <div className="social-grid">
            <button
              type="button"
              className="social-btn"
              onClick={() => alert("GitHub sign-in is a UI mock.")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>

            <button
              type="button"
              className="social-btn"
              onClick={() => alert("Google sign-in is a UI mock.")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.4 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4 0-.9.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5s.5 3.4 1.3 5l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.4-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>

          {/* Footer Note */}
          <footer className="card-footer">
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="#signup"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Sign-up flow is a placeholder in this UI demo.");
                }}
              >
                Create one now
              </a>
            </p>
          </footer>
        </section>

        {/* Security badge note */}
        <aside className="security-note">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>End-to-end 256-bit encrypted demonstration</span>
        </aside>
      </div>
    </main>
  );
}
