// Import necessary hooks and modules
import { useState } from "react"; // React hook for managing component state
import { useRouter } from "next/router"; // Next.js hook for programmatic navigation

// Define the Register component
export default function Register() {
  // State variables for email, password, and confirmPassword
  const [email, setEmail] = useState(""); // State to store the email input value
  const [password, setPassword] = useState(""); // State to store the password input value
  const [confirmPassword, setConfirmPassword] = useState(""); // State to store the confirm password input value

  // Initialize the Next.js router for navigation
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Show an alert if passwords don't match
      return; // Stop further execution
    }

    // Send a POST request to the registration API endpoint
    const response = await fetch("/api/auth/register", {
      method: "POST", // Specify the HTTP method
      headers: { "Content-Type": "application/json" }, // Set the request headers
      body: JSON.stringify({ email, password }), // Send email and password in the request body
    });

    // Check if the response is successful (status code 200-299)
    if (response.ok) {
      alert("Registration successful! Redirecting to login..."); // Show success message
      router.push("/login"); // Redirect to the login page
    } else {
      alert("Registration failed! Email might already be in use."); // Show error message
    }
  };

  // Render the registration form
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center font-mono bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900">
      {/* Header section with gradient text */}
      <div className="font-mono text-4xl flex w-full items-center justify-center bg-gradient-to-r from-cyan-100 via-sky-300 to-blue-800 bg-clip-text text-transparent">
        <p className="font-mono">DTP Online Signup</p>
      </div>

      {/* Registration form container */}
      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-1/3 mt-6">
        {/* Form title */}
        <h2 className="text-white text-2xl mb-4 text-center">Create an Account</h2>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Email input field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
          />

          {/* Password input field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
          />

          {/* Confirm Password input field */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
            className="p-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            Sign Up
          </button>
        </form>

        {/* Link to the login page */}
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>
    </div>
  );
}