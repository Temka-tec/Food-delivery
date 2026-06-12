import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const getCategories: RequestHandler = async (_req, res) => {
    const categories = await prisma.category.findMany({
        include: { foods: true },
        orderBy: { createdAt: "asc" },
    });
    res.status(200).json(categories);
}
