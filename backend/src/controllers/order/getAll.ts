import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const getAllOrders: RequestHandler = async (_req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { email: true, username: true } },
      items: { include: { food: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json({ orders });
};
