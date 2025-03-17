import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Registration successful! Redirecting to login...");
      router.push("/login");
    } else {
      alert("Registration failed! Email might already be in use.");
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900">
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p className="font-mono">DTP Online Signup</p>
      </div>

      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-1/3 mt-6">
        <h2 className="text-white text-2xl mb-4 text-center">Create an Account</h2>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>
    </div>
  );
}
