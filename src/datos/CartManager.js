import fs from "fs";

class CartManager {
    constructor () {
        this.path = "carts.json";
    }

    async getCarts (){
        let carts;
        try{
            let contenido = await fs.promises.readFile(this.path)
            carts = JSON.parse(contenido)
        }catch(error){
            console.log(error)
            throw error;
        }
        return carts;
    }

    async getProductOfCart (cid){
        let carrito = await this.getCarts();
        let idCarrito = carrito.find(carrito => carrito.id == cid)
        
        return idCarrito;
        
    }

    async addProductToCart (pid, cid){
        let carrito;
        let carritos = await this.getCarts();
        let indice = carritos.findIndex(carrito => carrito.id == cid)

        if (indice == -1){
            return carrito;
        }
        carritos[indice].products.push(pid);
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(carritos))
        }catch(error){
            console.log(error)
            throw error;
        }
        return carritos[indice];
    }

    getNextId(){
        return Date.now();
    }

    async createCart (){
        let newCart = {
            id: this.getNextId(),
            products: []
        }
        let carritos = await this.getCarts();
        carritos.push(newCart);

        try{
            await fs.promises.writeFile(this.path, JSON.stringify(carritos))
        }catch(error){
            console.log(error)
            throw error;
        }
        return newCart;
    }





}

export default CartManager;