import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controler/medicineController";
import { updateValiadation } from "../middleware/MedicineValidation";
const router = Router()

// route for add new medicine
router.post(`/`, [createMedicine], createMedicine)
//routte for show
router.get(`/`, readMedicine)
//route for updare medicine
router.put(`/:id`, [updateValiadation], updateMedicine)
//route for remove medicine
router.delete(`/:id`,deleteMedicine )

export default router