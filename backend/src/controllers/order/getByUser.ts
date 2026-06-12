import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const getOrdersByUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { food: true } } },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({ orders });
};
