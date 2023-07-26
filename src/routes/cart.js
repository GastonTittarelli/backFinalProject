import { Router } from "express";
// import CartManager from "../datos/ManagerCart.js";
import CarritoManager from "../DAO/CartDAO.js";
const cartRouter = Router();

//const cartManager = new CartManager();
const cartManager2 = new CarritoManager();

// productos obtenidos de mongo

cartRouter.post("/mon", async (req, res) => {
    let response;
    let { products } = req.body;
    if (!products) {
        res.status(400).send({ status: "error", message: "carrito incompleto" });
        return; 
    }
    try {
        response = await cartManager2.addCart(products);
        res.send({ status: "success", payload: response });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: "Error al añadir el carrito" });
    }
});

cartRouter.get("/mon", async (req, res) => {
    try {
        const carritos = await cartManager2.getAllCarts();
        res.send({ status: "success", payload: carritos });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: "Error al obtener los carritos", details: error });
    }
});

cartRouter.get("/mon/:cid", async (req, res) => {
    let cid = req.params.cid;
    let carrito;
    try{
        carrito = await cartManager2.getCartById(cid);
    } catch (error) {
        res.status(404).send({ error: "Internal Server Error", message: "El carrito con ese Id no se encuentra", details: error })
    }
    res.send({status: "success", payload: carrito})
})

cartRouter.post("/mon/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await cartManager2.addProductToCart(cid, pid);
        res.send({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: "Error al agregar el producto al carrito", details: error });
    }
});

cartRouter.delete("/mon/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await cartManager2.removeProductFromCart(cid, pid);
        res.send({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: "Error al eliminar el producto del carrito", details: error });
    }
});


cartRouter.put("/mon/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    try {
        const updatedCart = await cartManager2.updateProductQuantity(cid, pid, quantity);
        res.send({ status: "success", payload: updatedCart });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: "Error al actualizar la cantidad del producto en el carrito", details: error });
    }
    });

cartRouter.delete("/mon/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const deletedCart = await cartManager2.deleteCart(cid);
        res.send({ status: "success", payload: deletedCart });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: "Error al eliminar el carrito", details: error });
    }
})

cartRouter.get("/mon/:cid/products", async (req, res) => {
    let cid = req.params.cid;
    let carrito;
    try {
        carrito = await cartManager2.getCartById(cid);
        res.send({ status: "success", payload: carrito.products });
    } catch (error) {
        res.status(404).send({
        error: "Internal Server Error",
        message: "El carrito con ese ID no se encuentra",
        details: error,
        });
    }
});

export default cartRouter;

// cartRouter.post("mon/:cid/products/:pid", async (req, res) => {
//     let cid = req.params.cid;
//     let pid = req.params.pid;
//     let cart = await cartManager2.addProductToCart(cid, pid);

//     if(!cart){	
//         res.status(404).send({status: "error", message: "no se pudo agregar el producto al carrito"})
//     }
//     res.send({status: "success", message: "carrito creado"}) 
// })



// cartRouter.post("/:cid/products/:pid", async (req, res) => {
//     let cid = req.params.cid;
//     let pid = req.params.pid;
//     let cart = await cartManager.addProductToCart(cid, pid);

//     if(!cart){	
//         res.status(404).send({status: "error", message: "no se pudo agregar el producto al carrito"})
//     }
//     res.send({status: "success", message: "carrito creado"}) 
// })




// productos obtenidos de memoria (json)
// cartRouter.post("/", async (req, res) => {
// let newCart = await cartManager.createCart();
// if(!newCart){
//     res.status(404).send({status: "error", message: "no se pudo crear el carrito"})
// }
// res.send({status: "success", message: "carrito creado"})
// })

// cartRouter.get("/:cid", (req, res) => {
//     let cid = req.params.cid;
//     let cart = cartManager.getProductOfCart(cid);
//     if(!cart){
//         res.status(404).send({status: "error", message: "no se pudo encontrar los productos del carrito"})
//     }
//     res.send(cart);
// })

// cartRouter.post("/:cid/products/:pid", async (req, res) => {
//     let cid = req.params.cid;
//     let pid = req.params.pid;
//     let cart = await cartManager.addProductToCart(cid, pid);

//     if(!cart){	
//         res.status(404).send({status: "error", message: "no se pudo agregar el producto al carrito"})
//     }
//     res.send({status: "success", message: "carrito creado"}) 
// })

