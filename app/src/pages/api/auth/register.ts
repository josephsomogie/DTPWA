import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    console.log("✅ Read users file:", data);
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error reading users file:", error);
    return [];
  }
};

const writeUsers = (users: any) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    console.log("✅ Successfully wrote to users.json");
  } catch (error) {
    console.error("❌ Error writing users.json:", error);
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("📩 Incoming request:", req.method, req.body);

  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    let users = readUsers();

    if (users.some((user: any) => user.email === email)) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword });

    writeUsers(users);
    console.log("✅ User registered successfully:", email);

    return res.status(201).json({ message: "User registered successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
