export const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Este es el titulo de swagger",
            description: "Esta es la descripcion que va a figurar en la pagina principal"
        }
    },
    apis: ["src/docs/**/*.yaml"]
}