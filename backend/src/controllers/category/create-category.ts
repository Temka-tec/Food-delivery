import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const createCategory: RequestHandler = async (req, res) => {
    const body = req.body;

    const category = await prisma.category.create({
        data: {
            name: body.name,
        },
    });
    res.status(201).json(category);
}
