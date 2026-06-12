import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const createFood: RequestHandler = async (req, res) => {
    const body = req.body;

    const food = await prisma.food.create({
        data: {
            name: body.name,
            price: body.price,
            image: body.image,
            ingredients: body.ingredients,
            categories: {
                connect: (body.categoryIds ?? []).map((id: string) => ({ id })),
            },
        },
        include: { categories: true },
    });
    res.status(201).json(food);
}
