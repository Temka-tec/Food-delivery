import type { RequestHandler } from "express";
import { prisma } from "../../database/index.ts";

export const createOrder: RequestHandler = async (req, res) => {
  const { userId, items, address, total } = req.body;

  const order = await prisma.order.create({
    data: {
      userId,
      address,
      total,
      items: {
        create: items.map((item: { foodId: string; quantity: number; price: number }) => ({
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: { include: { food: true } } },
  });

  res.status(201).json({ order });
};
