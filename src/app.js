import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Setup for ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
import RegisterUserRoutes from "../src/routes/users/register/RegisterUserRoutes.js";
import UserLoginRoutes from "../src/routes/users/login/UserLoginRoutes.js";
import RegisterAdminRoutes from "../src/routes/admin/register/RegisterAdminRoutes.js";
import LoginAdminRoutes from "../src/routes/admin/login/LoginAdminRoutes.js";
import GetAllUserRoutes from "../src/routes/admin/get/GetAllUserRoutes.js";
import { validateRole } from "../src/middleware/AuthCheck.js";
import { authUser } from "./middleware/AuthUser.js";

const app = express();
const port = 5000;

// Middleware
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("view"));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/dashboard/admin", validateRole("admin"), (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Dashboard.html"));
});
app.get("/dashboard/admin/Customer/list", validateRole("admin"), (req, res) => {
  res.sendFile(path.join(__dirname, "views", "CustomerList.html"));
});
app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "AdminLogin.html"));
});

// Admin routes
app.post("/api/v1/admin/register", RegisterAdminRoutes);
app.post("/api/v1/admin/login", LoginAdminRoutes);

// User routes
app.post("/api/v2/register/user", RegisterUserRoutes);
app.post("/api/v2/login/user", UserLoginRoutes);

// Get All User admin only
app.get("/api/v1/customer/list", validateRole("admin"), GetAllUserRoutes);

// Product list
app.get("/api/v2/all/product", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Kit Alat Bor Baterai Genggam 98V",
      brand: "ECOSEN",
      price: 185000,
      originalPrice: 975000,
      discount: "81%",
      rating: 4.7,
      location: "Tangerang",
      image: "Kit Alat Bor Baterai Genggam 98V.jpg",
      badges: {
        discount: "Diskon Rp4RB",
        gift: "Hadiah Gratis",
      },
      stock: 15,
      description:
        "Kit alat bor baterai genggam tanpa kabel dengan 85 tools perlengkapan",
    },
    {
      id: 2,
      name: "REAIM Multi-alat 7 dalam 1 Gergaji multifungsi",
      brand: "REAIM",
      price: 799000,
      originalPrice: 1598000,
      discount: "50%",
      rating: 4.7,
      location: "Jakarta Utara",
      image: "REAIM Multi-alat 7 dalam 1 Gergaji multifungsi.jpg",
      badges: {
        discount: "Diskon Rp9RB",
        promo: "Pilih 2, diskon 1%",
      },
      stock: 8,
      description:
        "Brushless Multipurpose 7-in-1 Tool Set dengan garansi 3 tahun",
    },
    {
      id: 3,
      name: "Motorspeed Kit Alat Perbaikan Otomotif Set 94 PCS",
      brand: "Motorspeed",
      price: 44500,
      originalPrice: 114000,
      discount: "61%",
      rating: 4.6,
      location: "Kab. Tangerang",
      image: "Motorspeed Kit Alat Perbaikan Otomotif Set 94 PCS.avif",
      badges: {
        discount: "Diskon Rp2RB",
        gift: "Hadiah Gratis",
      },
      stock: 21,
      description:
        "Set kit alat perbaikan otomotif lengkap dengan 94 pcs perlengkapan dalam satu koper",
    },
    {
      id: 4,
      name: "REAIM Set Alat 1/2 1/4 Inci 187 PCS alat kunci sok",
      brand: "REAIM",
      price: 899000,
      originalPrice: 2366000,
      discount: "62%",
      rating: 4.7,
      location: "Jakarta Utara",
      image: "REAIM Set Alat Inci 187 PCS alat kunci sok.jpg",
      badges: {
        discount: "Diskon 1%",
        promo: "Pilih 2, diskon 1%",
      },
      stock: 7,
      description:
        "Set lengkap 187 PCS alat kunci sok dengan jaminan kualitas original",
    },
    {
      id: 5,
      name: "Kunci Shock Set Kunci Mata Sok 216 PCS",
      brand: "REAIM",
      price: 349000,
      originalPrice: 684000,
      discount: "49%",
      rating: 4.7,
      location: "Jakarta Utara",
      image: "../asset/Kunci Shock Set Kunci Mata Sok 216 PCS.jpg",
      badges: {
        discount: "Diskon Rp6RB",
        promo: "Pilih 2, diskon 1%",
      },
      stock: 12,
      description:
        "Tool Kit Set 216 pcs dengan garansi 3 tahun untuk berbagai kebutuhan perbaikan",
    },
    {
      id: 6,
      name: "Set Obeng Presisi 16 in 1 untuk Elektronik",
      brand: "ProTools",
      price: 75000,
      originalPrice: 120000,
      discount: "38%",
      rating: 4.8,
      location: "Jakarta Barat",
      image: "Set Obeng Presisi 16 in 1 untuk Elektronik.avif",
      badges: {
        discount: "Diskon Rp5RB",
        gift: "Hadiah Gratis",
      },
      stock: 30,
      description:
        "Set obeng presisi 16 in 1 cocok untuk perbaikan elektronik, smartphone, dan komputer",
    },
    {
      id: 7,
      name: "Mesin Gerinda Tangan 4 Inch 750W",
      brand: "PowerMax",
      price: 275000,
      originalPrice: 450000,
      discount: "39%",
      rating: 4.5,
      location: "Surabaya",
      image: "Mesin Gerinda Tangan 4 Inch 750W.webp",
      badges: {
        discount: "Diskon Rp10RB",
        promo: "Pilih 2, diskon 1%",
      },
      stock: 15,
      description:
        "Mesin gerinda tangan dengan daya 750W untuk kebutuhan potong dan asah",
    },
    {
      id: 8,
      name: "Set Kunci Pas dan Ring 8-24mm 12 PCS",
      brand: "ToolMaster",
      price: 129000,
      originalPrice: 225000,
      discount: "43%",
      rating: 4.6,
      location: "Bandung",
      image: "Set Kunci Pas dan Ring 8-24mm 12 PCS.jpg",
      badges: {
        discount: "Diskon Rp8RB",
        gift: "Bonus Tas",
      },
      stock: 25,
      description:
        "Set kunci pas dan ring ukuran 8-24mm dengan material baja chrome vanadium",
    },
  ];
  res.json({
    type: "success",
    product: products,
  });
  return;
});

// Protected
app.get("/api/v2/user/check", authUser, (req, res) => {
  res.json({
    message: "Access Passed",
  });
});

// Product CRUD

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
