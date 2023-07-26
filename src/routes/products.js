import { Router, json } from "express";
import ProductManager from "../datos/ManagerProducts.js";
import { validateProduct } from "../utils/index.js";
import ProductoManager from "../DAO/ProductDAO.js";
const productRouter = Router();

const manager = new ProductManager();
const manager2 = new ProductoManager();

// productos obtenidos de mongo
productRouter.get("/mon", async (req, res) => {
    let { limit, page, sort, query } = req.query;

    limit = limit ? parseInt(limit) : 10;
    page = page ? parseInt(page) : 1;
    sort = sort === "asc" ? "asc" : sort === "desc" ? "desc" : null;

    let productos;
    try {
        if (query) {
        productos = await manager2.searchProducts(query, limit, page, sort);
        } else {
        productos = await manager2.getAllProducts(limit, page, sort);
        }
        res.send({ status: "success", payload: productos });
    } catch (error) {
        res
        .status(500)
        .send({ error: "Internal Server Error", message: "Error al obtener los productos", details: error });
    }
});

productRouter.get("/mon/products", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const sort = req.query.sort === "asc" ? "asc" : "desc";
    const query = req.query.query || "";

    try {
        const { productos, totalProducts } = await manager2.searchProducts2(
        query,
        limit,
        page,
        sort
        );

        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `?limit=${limit}&page=${prevPage}` : null;
        const nextLink = hasNextPage ? `?limit=${limit}&page=${nextPage}` : null;

        res.send({
        status: "success",
        payload: productos,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink,
    });
    } catch (error) {
        res
        .status(500)
        .send({ error: "Internal Server Error", message: "Error al obtener los productos", details: error });
    }
});

productRouter.get("/:pid", async (req, res) => {
    let pid = req.params.pid;
    let producto;
    try{
        producto = await manager2.getProductById(pid);
        res.send({status: "success", payload: producto})
    } catch (error) {
        res.status(404).send({ error: "Internal Server Error", message: "El producto con ese Id no se encuentra", details: error })
    }
})


productRouter.post("/mon", async (req, res) => {
    let response;
    let { title, description, price, thumbnail, code, stock } = req.body;
    if(!title || !description || !price || !thumbnail || !code || !stock){
        res.status(400).send({ status: "error", message: "producto incompleto" })
    }
    try{
        response = await manager2.addProduct(title, description, price, thumbnail, code, stock);
        res.send({status: "success", payload: response})
    } catch (error){
        res.status(500).send({ error: "Internal Server Error", message: "Error al añadir el producto", details: error })
    }
})

productRouter.put("/:pid", async (req, res) => {
    let pid = req.params.pid;
    let { title, description, price, thumbnail, code, stock } = req.body;

    if(!title || !description || !price || !thumbnail || !code || !stock){
        return res.status(400).send({ error: "Bad Request", message: "Producto incompleto" });
    } 
    try{
        let productoUpdated = await manager2.updateProduct(pid, { title, description, price, thumbnail, code, stock });
        res.send({ status: "success", payload: productoUpdated });
        } catch (error){
            res.status(500).send({ error: "Internal Server Error", message: "Error al actualizar el producto", details: error });
        }
})

export default productRouter;

// productos obtenidos de memoria (json)
// productRouter.get("/", async (req, res) => {
//     let productos = await manager.getProducts()
//     const limit = req.query.limit;
//     if (limit){
//         res.send(productos.slice(0, limit));
//     }else{
//         res.send(productos);
//     }
// })

// productRouter.get("/:pid", async (req, res) => {
//     let pid = req.params.pid;
//     let producto = await manager.getProductById(pid)
//     res.send(producto);
// })

// productRouter.post("/", async (req, res) => {
//     let product = req.body;
//     if (!validateProduct(product)){
//         res.status(400).send({ status: "error", message: "producto incompleto" })
//     }
//     product.id = await manager.getNextId();
//     product.status = true;
//     await manager.addProduct(product);
//     res.send({ status: "success", message: "producto agregado" })
// })

// productRouter.put("/:pid", async (req, res) => {
//     let pid = req.params.pid;
//     let fields = req.body;
//     let updatedProd = await manager.updateProduct(pid, fields);
//     if(!updatedProd){
//         res.status(404).send({ status: "error", message: "no se pudo actualizar el producto" })
//     }
//     res.send({ status: "success", message: `Producto ${updatedProd.id} actualizado` }) 
// })

// productRouter.delete("/:pid", async (req, res) => {
//     let pid = req.params.pid;
//     let deletedProd = await manager.deleteProduct(pid);
//     if(!deletedProd){
//         res.status(404).send({ status: "error", message: "producto no encontrado, no se pudo eliminar" })
//     }
//     res.send({ status: "success", message: `Producto ${deletedProd.id} eliminado` })
// })

// export default productRouter;


