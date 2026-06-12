import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const updateOrderStatus: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  res.status(200).json({ order });
};
