import Ticket from "../DAO/TicketDao.js";
import User from "../DAO/User3DAO.js";

const ticketService = new Ticket();
const userService = new User();

export const getTicket = async (req, res) => {
    let tickets = await ticketService.getTicket();
    if(!tickets) return res.status(500).send({status: "error", error: "Error getting all tickets"}) 
    res.send({status: "success", result: tickets})
}

export const getTicketById = async (req, res) => {
    const { oid } = req.params;
    let ticket = await ticketService.getTicketById(oid);
    if(!ticket) return res.status(500).send({status: "error", error: "Error getting ticket by id"})
    res.send({status: "success", result: ticket})
}

export const createTicket = async (req, res) => {
    const { uid, bid, products } = req.body;
    let resultUser = await userService.getUsersById(uid);
    let ticketNumber = Date.now() + Math.floor(Math.random() *1000+1);
    let totalPrice = products.reduce((acc, product) => {
        if(product.price && typeof product.price === "number"){
            return acc + product.price
        } 
        return acc
    },0);

    let ticket = {
        number: ticketNumber,
        business: bid,
        user: uid,
        status:"Pending",
        products,
        totalPrice 
    }
    
    let ticketResult = await ticketService.createTicket(ticket);
    resultUser.tickets.push(ticketResult._id);
    await userService.updateUser(uid, resultUser);


    res.send({status: "success", result: ticketResult})
}

export const resolveTicket = async (req, res) => {
    const { resolve } = req.query;
    let ticket = await ticketService.getTicketById(req.params.oid);
    ticket.status = resolve;
    await ticketService.resolveTicket(ticket._id, ticket);
    res.send({status: "success", result: "Ticket resolved"})
}