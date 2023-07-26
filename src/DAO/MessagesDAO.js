import { messageModel } from "./models/messages.model.js";

class MessagesManager {
    constructor(){
        this.model = messageModel;
    }

    async getAllMessages(){
        let messages;
        try{
            messages = await this.model.find();
        } catch (error){
            throw error;
        }
        return messages;
    }
}

export default MessagesManager;