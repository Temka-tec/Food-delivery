import { Router } from "express";
import { login } from "../controllers/auth/login.ts";
import { register } from "../controllers/auth/register.ts"; 


const AuthRouter = Router();

AuthRouter.post("/login", login).post("/register", register);

export { AuthRouter};