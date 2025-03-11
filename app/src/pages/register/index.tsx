export default function Register() {
    return (
      <div
        className={`flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900`}
      >
        <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
          <p className="font-mono">DTP Online Signup</p>
        </div>
  
        <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-1/3 mt-6">
          <h2 className="text-white text-2xl mb-4 text-center">Create an Account</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
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
            Already have an account? <a href="/login" className="text-blue-400">Login</a>
          </p>
        </div>
      </div>
    );
  }
  