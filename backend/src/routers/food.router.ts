import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods.ts";
import { createFood } from "../controllers/food/create-foods.ts";

const FoodRouter = Router();

FoodRouter.get("/", getFoods).post("/", createFood);

export { FoodRouter};