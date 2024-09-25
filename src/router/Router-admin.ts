import { Router } from "express";
import { createAdmin, readAdmins, updateAdmin, deleteAdmin, authentication } from "../controler/AdminControler";
import { authValidation, createValidation, updateValidation } from "../middleware/AdminValidation";

const router = Router();

/** Route to create a new admin */
router.post("/", [createValidation], createAdmin);

/** Route to get all admins or search */
router.get("/", readAdmins);

/** Route to update an admin by ID */
router.put("/:id", [updateValidation], updateAdmin);

/** Route to delete an admin by ID */
router.delete("/:id", deleteAdmin);
router.post(`/auth`, [authValidation], authentication)

export default router;