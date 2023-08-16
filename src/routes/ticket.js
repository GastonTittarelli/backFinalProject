import { Router } from "express";
import  { getTicket, getTicketById, createTicket, resolveTicket } from "../controllers/ticket.controller.js";
const ticketRouter = Router();

ticketRouter.get("/", getTicket);
ticketRouter.get("/:oid", getTicketById);
ticketRouter.post("/", createTicket);
ticketRouter.put("/:oid", resolveTicket);

export default ticketRouter;