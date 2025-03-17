import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import fs from "fs";
import path from "path";

// Path to users.json
const usersFilePath = path.join(process.cwd(), "data", "users.json");

// Function to read users from JSON file
function readUsers() {
  try {
    if (!fs.existsSync(usersFilePath)) return []; // If file doesn't exist, return empty array
    const fileContent = fs.readFileSync(usersFilePath, "utf-8");
    return fileContent.trim() ? JSON.parse(fileContent) : [];
  } catch (error) {
    console.error("Error reading users.json:", error);
    return [];
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((u: any) => u.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  // Set token in HTTP-only cookie
  res.setHeader("Set-Cookie", serialize("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600, // 1 hour
  }));

  res.status(200).json({ message: "Login successful!" });
}

