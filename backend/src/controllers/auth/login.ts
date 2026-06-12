import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";
import jwt from "jsonwebtoken"

export const login: RequestHandler = async ( req, res) => {
    const { email, password} = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found"});

    const { password: userPassword, ...rest } = user;

    if (userPassword !== password ) return res.status(401).json({ message: "Username or password wrong"});

    const accessToken = jwt.sign({user: rest}, "Secret")

    res.status(200).json({
        user: rest,
        accessToken
    })
}
