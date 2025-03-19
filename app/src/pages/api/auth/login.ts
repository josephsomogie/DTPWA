// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next"; // Next.js types for API requests and responses
import jwt from "jsonwebtoken"; // Library for working with JSON Web Tokens (JWT)
import bcrypt from "bcryptjs"; // Library for hashing and comparing passwords
import { serialize } from "cookie"; // Utility to serialize cookies for HTTP headers
import fs from "fs"; // Node.js file system module for reading files
import path from "path"; // Node.js path module for handling file paths

// Define the path to the users.json file
const usersFilePath = path.join(process.cwd(), "data", "users.json");

// Function to read users from the users.json file
function readUsers() {
  try {
    // Check if the file exists; if not, return an empty array
    if (!fs.existsSync(usersFilePath)) return [];
    // Read the file content as a UTF-8 string
    const fileContent = fs.readFileSync(usersFilePath, "utf-8");
    // If the file is not empty, parse it as JSON; otherwise, return an empty array
    return fileContent.trim() ? JSON.parse(fileContent) : [];
  } catch (error) {
    console.error("Error reading users.json:", error); // Log any errors
    return []; // Return an empty array if there's an error
  }
}

// Default API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests; return 405 for other methods
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Extract email and password from the request body
  const { email, password } = req.body;

  // Read the list of users from the JSON file
  const users = readUsers();

  // Find the user with the matching email
  const user = users.find((u: any) => u.email === email);

  // If no user is found or the password doesn't match, return a 401 Unauthorized response
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token for the authenticated user
  const token = jwt.sign(
    { id: user.id, email: user.email }, // Payload containing user data
    process.env.JWT_SECRET as string, // Secret key for signing the token
    { expiresIn: "1h" } // Token expiration time (1 hour)
  );

  // Set the JWT token in an HTTP-only cookie
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", token, { // Serialize the cookie
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Prevent cross-site request forgery (CSRF)
      path: "/", // Make the cookie available across the entire site
      maxAge: 3600, // Cookie expiration time in seconds (1 hour)
    })
  );

  // Return a 200 OK response with a success message
  res.status(200).json({ message: "Login successful!" });
}