import { Router } from "express";
import { createOrder } from "../controllers/order/create.ts";
import { getOrdersByUser } from "../controllers/order/getByUser.ts";
import { getAllOrders } from "../controllers/order/getAll.ts";
import { updateOrderStatus } from "../controllers/order/updateStatus.ts";

const OrderRouter = Router();

OrderRouter.post("/", createOrder)
  .get("/", getAllOrders)
  .get("/user/:userId", getOrdersByUser)
  .patch("/:id/status", updateOrderStatus);

export { OrderRouter };
