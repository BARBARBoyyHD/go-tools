import { mysql2 } from "../../../models/mysql/mysql2.js";

export async function getAllUsers(req, res) {
  try {
    const sql =
      "SELECT id,name,email,role,address,phone,created_at FROM users WHERE role = 'user' ";
    const [result] = await mysql2.query(sql);
    res.status(200).json({
      type: "Success",
      data: result,
    });
    return;
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
