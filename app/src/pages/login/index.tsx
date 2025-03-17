import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      router.push("/bio");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900">
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p className="font-mono">DTP Online Login</p>
      </div>

      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-1/3 mt-6">
        <h2 className="text-white text-2xl mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400">Sign up</a>
        </p>
      </div>
    </div>
  );
}

