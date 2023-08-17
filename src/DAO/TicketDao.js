import { ticketModel } from "./models/ticket.model.js";

export default class Ticket{

    getTicket = async () => {
        try{
            let ticket = await ticketModel.find()
            return ticket;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    getTicketById = async id => {
        try{
            let ticket = await ticketModel.findOne({ _id: id })
            return ticket;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    createTicket = async ticket => {
        try{
            let result = await ticketModel.create(ticket);
            return result;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    resolveTicket = async (id, ticket) => {
        try{
            let result = await ticketModel.updateOne({ _id: id }, { $set: ticket})
            return result;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

}