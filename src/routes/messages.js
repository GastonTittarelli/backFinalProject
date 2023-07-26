import { Router } from "express";
import MessagesManager from "../DAO/MessagesDAO.js";
const messagesRouter = Router();

const messagesManager = new MessagesManager();

// Mensajes obtenidos de mongo
messagesRouter.get("/mon", async (req, res) => {
    let messages;
    try{
        messages = await messagesManager.getAllMessages();
    } catch (error) {
        res.status(404).send({ error: "Internal Server Error", message: "No se han encontrado los mensajes", details: error })
    }
    res.send({status: "success", payload: messages})
})

export default messagesRouter;