import { carritoModel } from "./models/cart.model.js";
import ProductoManager from "./ProductDAO.js"

const productoManager = new ProductoManager();

class CarritoManager {
    constructor(){
        this.model = carritoModel;
    }

    async getAllCarts(){
        let carritos;
        try{
            carritos = await this.model.find().exec();
            return carritos;
        } catch (error){
        throw error;
    }
    }
    
    async getCartById(cid){
        try{
            const carrito = await this.model.findById(cid).exec();
            
            if (!carrito) {
                throw new Error("El carrito con ese ID no se encuentra");
            }
            return carrito;
        }
        catch (error){
            throw error;
        }
}

async addCart(products){
    let newCart = new this.model({ products });
    try{
        await newCart.save();
        return newCart;
    } catch (error){
        throw error;
    }
}

    async addProductToCart(cid, pid) {
        try {
            let cart = await this.getCartById(cid);
            let product = await productoManager.getProductById(pid);

            if (!cart || !product) {
                throw new Error("El carrito o el producto no existe");
            }

            cart.products.push(product);

            await cart.save();
            return cart;
            
        } catch (error) {
            console.log(" Error en la solicitud: ",error);
            throw error;
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            let cart = await this.getCartById(cid);
            if (!cart) {
            throw new Error("El carrito con ese ID no se encuentra");
            }
            const product = cart.products.find((product) => product._id === pid);
            if (!product) {
            throw new Error("El producto con ese ID no se encuentra en el carrito");
            }
            const productIndex = cart.products.indexOf(product);
            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            console.error(error); 
            throw error; 
        }
    }

    async deleteCart(cid){
        try{
            let cart = await this.getCartById(cid);
            if (!cart) {
                throw new Error("El carrito con ese ID no se encuentra");
            }
            await cart.remove();
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            let cart = await this.getCartById(cid);
            if (!cart) {
            throw new Error("El carrito con ese ID no se encuentra");
            }
        
            const product = cart.products.find((product) => product._id === pid);
            if (!product) {
            throw new Error("El producto con ese ID no se encuentra en el carrito");
            }
        
            product.quantity = quantity; 
        
            await cart.save(); 
        
            return cart;
        } catch (error) {
            console.error(error);
            throw error;
        }
        }
        
}


export default CarritoManager;