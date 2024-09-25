import multer from "multer";
import { Request } from "express";
import { ROOT_DIRECTORY } from "../config";
// define Storage to save uploaded file

const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: (err: Error | null, destination: string) => void
    ) => {
        const storagePath = `${ROOT_DIRECTORY}/Public/Medicine-Photo/`
        callback(null, storagePath);
    },
    filename: (
        req: Request,
        file: Express.Multer.File,
        callback: (err: Error | null, destination: string) => void
    ) => {
        const fileName = `${Math.random()}-${file.originalname}`
        callback(null, fileName);
    }
})

//define fungction to filter file 
const fileFilter = (req:Request, file:Express.Multer.File, callback:multer.FileFilterCallback)=>{
    //define allowed exestension
    const allowedFile =/png|jpg|jpeg|gif/
    //check exestension of uploaded file
    const isAllow =allowedFile.test(file.mimetype)
    if (isAllow){
        callback(null,true)
    }else{
        callback(new Error(`raiso`))
    }
}

const uploadMedicinePhoto =multer({
    storage,
    fileFilter:fileFilter,
    limits: {fileSize:2*1024*1024}
})
export {uploadMedicinePhoto}