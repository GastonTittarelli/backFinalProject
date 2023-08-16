import { Router } from "express";
import { getUsers, getUsersById, saveUsers } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:uid", getUsersById);
userRouter.post("/", saveUsers);

export default userRouter;