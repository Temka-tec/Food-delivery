import type { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.ts";

export const getFoods: RequestHandler = async (_req, res) => {
    const foods = await FoodModel.find({});
    res.status(200).json(foods);
}