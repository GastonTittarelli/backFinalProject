import { Router} from "express";
import {authMiddleware} from "../middlewares/auth.js";

const viewsRouter = Router();

viewsRouter.get("/", authMiddleware, async (req, res) => {
    let user = req.session.user;
    res.render("home", {user})
});

viewsRouter.get("/login", async(req, res) => {
    res.render("login", {})
});

export default viewsRouter;