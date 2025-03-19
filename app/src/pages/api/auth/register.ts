// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next"; // Next.js types for API requests and responses
import fs from "fs"; // Node.js file system module for reading/writing files
import path from "path"; // Node.js path module for handling file paths
import bcrypt from "bcryptjs"; // Library for hashing passwords

// Define the path to the users.json file
const usersFilePath = path.join(process.cwd(), "data", "users.json");

// Function to read users from the users.json file
const readUsers = () => {
  try {
    // Read the file synchronously and parse it as JSON
    const data = fs.readFileSync(usersFilePath, "utf8");
    console.log("✅ Read users file:", data); // Log success message
    return JSON.parse(data); // Return the parsed JSON data
  } catch (error) {
    console.error("❌ Error reading users file:", error); // Log error if reading fails
    return []; // Return an empty array if there's an error
  }
};

// Function to write users to the users.json file
const writeUsers = (users: any) => {
  try {
    // Write the updated users array to the file, formatting it with 2-space indentation
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("✅ Successfully wrote to users.json"); // Log success message
  } catch (error) {
    console.error("❌ Error writing users.json:", error); // Log error if writing fails
  }
};

// Default API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📩 Incoming request:", req.method, req.body); // Log the incoming request method and body

  // Handle POST requests (user registration)
  if (req.method === "POST") {
    const { email, password } = req.body; // Extract email and password from the request body

    // Check if email or password is missing
    if (!email || !password) {
      console.log("❌ Missing email or password"); // Log error if fields are missing
      return res.status(400).json({ message: "Email and password are required" }); // Return a 400 error
    }

    // Read the existing users from the file
    let users = readUsers();

    // Check if a user with the same email already exists
    if (users.some((user: any) => user.email === email)) {
      console.log("❌ User already exists:", email); // Log error if user exists
      return res.status(400).json({ message: "User already exists" }); // Return a 400 error
    }

    // Hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Add the new user to the users array
    users.push({ email, password: hashedPassword });

    // Write the updated users array back to the file
    writeUsers(users);
    console.log("✅ User registered successfully:", email); // Log success message

    // Return a 201 status code and success message
    return res.status(201).json({ message: "User registered successfully" });
  }

  // Handle unsupported HTTP methods
  return res.status(405).json({ message: "Method not allowed" });
}