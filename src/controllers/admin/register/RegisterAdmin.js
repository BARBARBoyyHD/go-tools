import { mysql2 } from "../../../models/mysql/mysql2.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
  try {
    let { name, email, password, phone, address } = req.body;
    const role = "admin"; // force role to admin
    const id = `admin_${Date.now()}`; // unique string ID
    const created_at = new Date();

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const sql = `
      INSERT INTO users (id, name, email, password, role, address, phone, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id,
      name,
      email,
      hashedPassword, // use hashed password here
      role,
      address || "",
      phone || "",
      created_at,
    ];

    const [result] = await mysql2.query(sql, values);

    res.status(201).json({
      message: "Admin registered successfully",
      data: {
        id,
        name,
        email,
        role,
        phone,
        address,
        created_at,
      },
    });
    return;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
