import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const deleteFood: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await prisma.food.delete({ where: { id } });
  res.status(200).json({ message: "Deleted" });
};
