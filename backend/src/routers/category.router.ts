import { Router } from "express";
import { getCategories } from "../controllers/category/get-categories.ts";
import { createFood } from "../controllers/food/create-foods.ts";
import { createCategory } from "../controllers/category/create-category.ts";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories).post("/create", createCategory);

export { CategoryRouter};