import { Router } from "express";
import { getBusiness, getBusinessById, createBusiness, addProduct } from "../controllers/business.controller.js";

const businessRouter = Router();

businessRouter.get("/", getBusiness);
businessRouter.get("/:bid", getBusinessById);
businessRouter.post("/", createBusiness);
businessRouter.post("/:bid/product", addProduct);

export default businessRouter;