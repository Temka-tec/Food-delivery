import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const getFoods: RequestHandler = async (_req, res) => {
    const foods = await prisma.food.findMany({
        include: { categories: true },
        orderBy: { createdAt: "desc" },
    });
    res.status(200).json(foods);
}
