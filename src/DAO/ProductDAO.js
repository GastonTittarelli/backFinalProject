import { productsModel } from "./models/products.model.js";

class ProductoManager{
    constructor(){
        this.model = productsModel;
    }

    async getAllProducts(limit = 10, page = 1, sort = null) {
        try {
            let query = {};
    
            if (sort) {
            query.sort = { price: sort === "asc" ? 1 : -1 };
            }
    
          const skip = (page - 1) * limit;
    
            const productos = await this.model
            .find({}, null, query)
            .skip(skip)
            .limit(limit);
    
            return productos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProductById(id){
        try{
            const producto = await this.model.findOne({_id: id});

            if (!producto) {
                throw new Error("El producto con ese ID no se encuentra");
            }
            return producto;

        }catch (error){
        throw error;
        console.log(error);
    }
}

    async addProduct(title, description, price, thumbnail, code, stock){
        let producto;
        try{
            producto = await productsModel.create({
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            });
        } catch (error){
            console.log(error);
    }
    return producto;
}

    async updateProduct(pid, properties){
        let usuario
        try{
            usuario = await productsModel.updateOne({_id: pid}, properties);
        } catch (error){
            console.log(error);
        }
        return usuario;
    }

    async searchProducts(query, limit = 10, page = 1, sort = null) {
        try {
            let searchQuery = {};
    
            if (sort) {
            searchQuery.sort = { price: sort === "asc" ? 1 : -1 };
            }
    
          const skip = (page - 1) * limit;
    
            const productos = await this.model
            .find({ title: query }, null, searchQuery)
            .skip(skip)
            .limit(limit);
    
            return productos;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async searchProducts2(query, limit, page, sort) {
    const queryFilter = query ? { title: query } : {};
    const skip = (page - 1) * limit;
    const countPromise = this.model.countDocuments(queryFilter);
    const productsPromise = this.model
        .find(queryFilter)
        .sort({ price: sort === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(limit);
    const [totalProducts, products] = await Promise.all([countPromise, productsPromise]);
    return { productos: products, totalProducts: totalProducts };
}

}

export default ProductoManager;