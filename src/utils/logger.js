import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

let logger;

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    }
}

const buildProdLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: "info"}),
            new winston.transports.File({ filename: "./file.log", level: "warn"})
        ]
    })
    return logger;
}


const buildDevLogger = () => {
    const logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({ 
                level: "info",
                format: winston.format.simple()
            }),
            new winston.transports.File({ filename: "./file.log", level: "info", format: winston.format.simple()})
        ]
    })
    return logger;
}

if(process.env.ENV === "production"){
    logger = buildProdLogger()
} else{
    logger = buildDevLogger()
}

export const addLogger = (req, res, next) =>{
    req.logger = logger;
    next()
}