import { Router } from "express";
import { getAllUsers } from "../../../controllers/admin/get/GetListUsers.js";
const router = Router();

router.get("/api/v1/customer/list", getAllUsers);

export default router;
