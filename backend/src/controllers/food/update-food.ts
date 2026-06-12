import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const updateFood: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, ingredients, image, categoryIds } = req.body;

  const food = await prisma.food.update({
    where: { id },
    data: {
      name,
      price: parseFloat(price),
      ingredients,
      image,
      categories: categoryIds
        ? { set: categoryIds.map((cid: string) => ({ id: cid })) }
        : undefined,
    },
    include: { categories: true },
  });
  res.status(200).json(food);
};
