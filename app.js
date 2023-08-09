import express from "express";
import productRouter from "./src/routes/products.js";
import cartRouter from "./src/routes/cart.js";
import handlebars from "express-handlebars";
import messagesRouter from "./src/routes/messages.js";
import ProductManager from "./src/datos/ManagerProducts.js";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionRouter from "./src/routes/session.js";
import { Router } from "express";
import passport from "passport";
import {initializePassport, initializePassportGithub} from "./src/config/passport.config.js";
import viewsRouter from "./src/routes/views.js";
import config from "./src/config/libreria.config.js";
import authRouter from "./src/routes/auth.js";
import cookieParser from "cookie-parser";

const manager = new ProductManager();

const app = express();

// const baseDeDatos = mongoose.connect('mongodb+srv://g:proyecto321@proyecto.veaq7ux.mongodb.net/ecommerce?retryWrites=true&w=majority');


const serve = http.Server(app);
const io = new Server(serve);

app.engine(".hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs"}));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/auth", authRouter);

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://g:proyecto321@proyecto.veaq7ux.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 20
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
}))

initializePassport();
initializePassportGithub();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/session", sessionRouter);
app.use("/", viewsRouter);

app.get("/hbs", async (req, res) => {
    let productos = await manager.getProducts();

    res.render("productos", {productos});
})


io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado");

    socket.emit("productos", manager.getProducts());
});

app.get('/realtimeproducts', async (req, res) => {
    let productos = await manager.getProducts();
    res.render('realtimeproducts', { productos }); 
});


const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${server.address().port}`))
server.on("error", error => console.log(error))