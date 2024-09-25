import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/** Create an instance of Prisma Client */
const prisma = new PrismaClient({ errorFormat: "minimal" });

/** Create a new admin */
const createAdmin = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const findEmail = await prisma.admin.findFirst({where:{email}})
        if (findEmail){
            return res.status(400)
                .json({message:` Email has exists`})
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const newAdmin = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashPassword
            },
        });

        return res.status(200).json({
            message: `New admin has been created`,
            data: newAdmin,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating admin",
            error: (error as Error).message,
        });
    }
};

/** Read all admins or search by name */
const readAdmins = async (req: Request, res: Response) => {
    try {
        const search = req.query.search || "";
        const allAdmins = await prisma.admin.findMany({
            where: {
                OR: [
                    { name: { contains: search.toString() } },
                    { email: { contains: search.toString() } },
                ],
            },
        });
        return res.status(200).json({
            message: `Admins have been retrieved`,
            data: allAdmins,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving admins",
            error: (error as Error).message,
        });
    }
};

/** Update an admin */
const updateAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) },
        });
        if (!findAdmin) {
            return res.status(404).json({
                message: `Admin not found`,
            });
        }

        const { name, email, password } = req.body;

        const updatedAdmin = await prisma.admin.update({
            where: { id: Number(id) },
            data: {
                name: name ?? findAdmin.name,
                email: email ?? findAdmin.email,
                password: password ?
                await bcrypt.hash(password, 12)
                : findAdmin.password
            },
        });

        return res.status(200).json({
            message: `Admin has been updated`,
            data: updatedAdmin,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating admin",
            error: (error as Error).message,
        });
    }
};

/** Delete an admin */
const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const findAdmin = await prisma.admin.findFirst({
            where: { id: Number(id) },
        });
        if (!findAdmin) {
            return res.status(404).json({
                message: `Admin not found`,
            });
        }

        const deletedAdmin = await prisma.admin.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({
            message: `Admin has been deleted`,
            data: deletedAdmin,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting admin",
            error: (error as Error).message,
        });
    }
};

/**function for login(authentication) */
const authentication = async (
    req: Request,
    res: Response
) => {
    try {
        const {email, password}= req.body

        const findAdmin = await prisma
            .admin.findFirst({
                where: {email}
            })

            if(!findAdmin){
                return res.status(200)
                .json({
                    message: `Email is not registed`
                })
            }

            const isMatchPassword = await bcrypt
            .compare(password, findAdmin.password)

            if(!isMatchPassword){
                return res.status(200)
                .json({
                    message: `Invalid password`
                })
            }

            /**prepare to generate token
             * using JWT */
            const payload = {
                name: findAdmin.name,
                email: findAdmin.email
            }

            const signature = process.env.SECRET || ``

            const token = jwt.sign(payload, signature)

            return res.status(200)
            .json({
                logged: true,
                token,
                id: findAdmin.id,
                name: findAdmin.name,
                email: findAdmin.email
            })

    }catch(error) {
        return res
        .status(500)
        .json(error)
    }
}
export { createAdmin, readAdmins, updateAdmin, deleteAdmin, authentication };