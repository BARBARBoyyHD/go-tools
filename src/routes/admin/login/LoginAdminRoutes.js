import { Router } from "express";
import { login } from "../../../controllers/admin/login/LoginAdmin.js";
const router = Router();

router.post("/api/v1/admin/login", login);

export default router;
