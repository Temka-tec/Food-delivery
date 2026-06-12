import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods.ts";
import { createFood } from "../controllers/food/create-foods.ts";
import { updateFood } from "../controllers/food/update-food.ts";
import { deleteFood } from "../controllers/food/delete-food.ts";

const FoodRouter = Router();

FoodRouter.get("/", getFoods)
  .post("/", createFood)
  .post("/create", createFood)
  .put("/:id", updateFood)
  .delete("/:id", deleteFood);

export { FoodRouter };
