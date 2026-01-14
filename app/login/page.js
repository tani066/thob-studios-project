"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleLogin() {
    setLoading(true);
    const endpoint =
      mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Authentication failed");
      return;
    }

    if (mode === "signup") {
      setNotice("Signup successful. Please login to continue.");
      setMode("login");
      return;
    }

    window.location.href = "/";
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {mode === "signup" ? "Sign Up" : "Login"}
      </h1>
      {notice && (
        <p className="mb-3 text-green-700 bg-green-50 border border-green-200 p-2 rounded">
          {notice}
        </p>
      )}

      <input
        type="email"
        placeholder="Enter email"
        className="border p-2 w-full mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        className="bg-gray-200 text-black px-4 py-2 w-full mb-2"
      >
        Switch to {mode === "signup" ? "Login" : "Sign Up"}
      </button>
      <button
        disabled={!email || !password || loading}
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2 w-full disabled:opacity-50"
      >
        {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Login"}
      </button>
      <p className="text-center mt-3 text-sm">
        Or <Link href="/" className="underline">browse products</Link>
      </p>
    </main>
  );
}
