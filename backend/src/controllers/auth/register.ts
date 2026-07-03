import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const register: RequestHandler = async ( req, res) => {
    const { username, password, email} = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }

    const isUsernameExist = await prisma.user.findUnique({ where: { username } });

    if (isUsernameExist) return res.status(400).json({message: "Username already exists"})

    const isEmailExist = await prisma.user.findUnique({ where: { email } });

    if (isEmailExist) return res.status(400).json({message: "Email already exists"})

    const user = await prisma.user.create({
        data: {
            username,
            password,
            email
        }
    })

    const { password: _password, ...safeUser } = user;

    res.status(201).json({ user: safeUser})

}
