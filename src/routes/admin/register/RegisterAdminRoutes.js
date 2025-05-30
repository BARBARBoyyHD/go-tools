import { Router } from "express";
import { register } from "../../../controllers/admin/register/RegisterAdmin.js";
const router = Router();

router.post("/api/v1/admin/register", register);

export default router;
