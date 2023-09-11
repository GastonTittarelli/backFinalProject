import nodemailer from "nodemailer";
import config from "../config/libreria.config.js"

const transport = nodemailer.createTransport({
    service: "gmail",
    port:567,
    auth: {
        user: config.GMAIL_USER_AUTH,
        pass: config.GMAIL_PASS_AUTH
    }
})

export const sendMaild = async options => {
    let result = await transport.sendMail(options);
    return result;
}

export const createOptions = to =>{
    return {
        from: "Email <mimailgmail@gmail.com>",
        to,
        subject: "Asunto",
    }
}