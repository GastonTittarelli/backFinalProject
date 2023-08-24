import { faker } from "@faker-js/faker";

export const generateUsuario = () => {
    return {
        id: faker.database.mongodbObjectId(),
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        nacimiento: faker.date.birthdate(),
        telefono: faker.phone.number(),
        productos: generarProductos(100)    
    }
}

export const generateUsuarios = (cantidad) => {
    const users = [];
    for (let i = 0; i < cantidad; i++) {
        users.push(generateUsuario());
    }
    return users;
}

const generarProductos = cantidad => {
    const productos = [];
    for (let i = 0; i < cantidad; i++) {
        productos.push(generarProducto());
    }
    return productos;
}


const generarProducto = () => {
    return{
        id: faker.database.mongodbObjectId(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        price: faker.commerce.price()
    }
}