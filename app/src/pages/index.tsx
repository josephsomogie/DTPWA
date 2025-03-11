import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  return (
    <div
      className="flex flex-col w-screen h-screen items-center justify-center bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900"
    >
      {/* Navbar */}
      <div className="w-full h-16 flex justify-end items-center px-10 absolute top-0">
        <button 
          onClick={() => router.push("/login")} 
          className="px-4 py-2 text-white border border-cyan-400 rounded-md hover:bg-cyan-600 transition"
        >
          Login
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full h-16 flex justify-center items-center mt-10">
        <p className="cursor-pointer animate-pulse bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-6xl font-mono">
          Decentralized Transfer Protocol
        </p>
      </div>

      {/* Navigation Links */}
      <div className="w-1/2 mt-5 flex flex-row items-center justify-evenly font-mono">
        <p 
          onClick={() => router.push("/about")}
          className="hover:outline hover:outline-cyan-200 p-1 rounded cursor-pointer bg-gradient-to-r from-cyan-200 to-blue-400 bg-clip-text text-transparent">
          About
        </p>
        <p 
          onClick={() => router.push("/installation")}
          className="hover:outline hover:outline-cyan-200 p-1 rounded cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-600 bg-clip-text text-transparent">
          Installation
        </p>
        <p 
          onClick={() => router.push("/documentation")}
          className="hover:outline hover:outline-cyan-200 p-1 rounded cursor-pointer bg-gradient-to-r from-cyan-100 to-blue-300 bg-clip-text text-transparent">
          Documentation
        </p>
        <p 
          onClick={() => router.push("/demo")}
          className="hover:outline hover:outline-cyan-200 p-1 rounded cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-600 bg-clip-text text-transparent">
          Online Demo
        </p>
      </div>
    </div>
  );
}
