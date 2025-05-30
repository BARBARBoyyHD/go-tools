import { Router } from "express";
import { login } from "../../../controllers/users/login/LoginUser.js";
const router = Router();

router.post("/api/v2/login/user", login);

export default router;
