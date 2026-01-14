"use client";

import Link from "next/link";
import { useUser } from "./use-user";
import { useState } from "react";

export function AuthBar() {
  const user = useUser();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setLoading(false);
    window.location.href = "/";
  }

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <Link href="/" className="font-semibold text-black">
        Dynamic Configurator
      </Link>
      <div className="flex items-center gap-3">
        
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name || user.email}</span>
            <button
              onClick={logout}
              disabled={loading}
              className="text-sm bg-black text-white px-3 py-1 rounded disabled:opacity-50"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-sm bg-black text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
