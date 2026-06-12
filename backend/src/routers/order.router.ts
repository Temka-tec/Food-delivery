import { Router } from "express";
import { createOrder } from "../controllers/order/create.ts";
import { getOrdersByUser } from "../controllers/order/getByUser.ts";

const OrderRouter = Router();

OrderRouter.post("/", createOrder).get("/user/:userId", getOrdersByUser);

export { OrderRouter };
