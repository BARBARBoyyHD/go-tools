// services/mysqlClient.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const mysql2 = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: "",
  waitForConnections: true,
  connectionLimit: 10,
});
