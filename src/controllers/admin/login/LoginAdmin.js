import { mysql2 } from "../../../models/mysql/mysql2.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_KEY;

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    console.log("Login attempt:", req.body);
    const [rows] = await mysql2.query(
      "SELECT * FROM users WHERE email = ? AND role = 'admin'",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const access_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with cookie
    res
      .cookie("access_token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600 * 1000, // 1 hour
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          email: user.email,
          role: user.role,
        },
      });
    return;
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
