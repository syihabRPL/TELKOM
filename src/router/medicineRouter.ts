import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controler/medicineController";
import { updateValiadation } from "../middleware/MedicineValidation";
import { uploadMedicinePhoto } from "../middleware/UploadMedicinePhoto";
import { verivyToken } from "../middleware/authorization";
const router = Router()

// route for add new medicine
router.post(`/`, [verivyToken,uploadMedicinePhoto.single(`photo`),createMedicine], createMedicine)
//routte for show
router.get(`/`,[verivyToken], readMedicine)
//route for update medicine
router.put(`/:id`, [verivyToken,uploadMedicinePhoto.single(`photo`),updateValiadation], updateMedicine)
//route for remove medicine
router.delete(`/:id`,[verivyToken],deleteMedicine )

export default router