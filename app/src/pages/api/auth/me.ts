// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next"; // Next.js types for API requests and responses
import jwt from "jsonwebtoken"; // Library for working with JSON Web Tokens (JWT)
import { parse } from "cookie"; // Utility to parse cookies from the request headers

// Default API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Parse cookies from the request headers
  const cookies = parse(req.headers.cookie || ""); // Extract cookies from the "Cookie" header or default to an empty string
  const token = cookies.auth_token; // Get the value of the "auth_token" cookie

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" }); // No token means the user is not authenticated
  }

  try {
    // Verify the token using the JWT secret stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Decode and verify the token
    res.status(200).json({ user: decoded }); // Return the decoded user data with a 200 OK response
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ message: "Invalid token" }); // Invalid or expired token
  }
}