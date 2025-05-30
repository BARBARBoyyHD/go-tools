import { Router } from "express";
import { registerUsers } from "../../../controllers/users/register/RegisterUser.js";
const router = Router();

router.post("/api/v2/register/user", registerUsers);

export default router;
