import { Router } from 'express';  
import { getByEmail, createUser } from '../DAO/User2DAO.js';
import { generateToken, authToken } from '../utils/jwt.js';
import { validatePassword } from '../utils/index.js';
const authRouter = Router();

authRouter.get('/', (req, res) => {
    res.send("auth router get ok")
});

authRouter.post('/register', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    if (!first_name || !last_name || !email || !password) return res.send({status: "error", error: "falta uno o mas valores"})
    const user = await getByEmail(email)
    if(user) return res.send.status(400).send({status: "error", error: "El usuario ya existe"});

    const newUser={
        first_name, 
        last_name, 
        email, 
        password
    };

    await createUser(newUser);

    res.send({status: "succes", msg: "Usuario registrado exitosamente"})
});

authRouter.post("/login", async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({status: "error", error: "falta uno o mas valores"})
    const user = await getByEmail(email);
    if(!user) return res.send.status(400).send({status: "error", error: "El usuario no se encuentra"});
    if(!validatePassword(user, password)) return res.status(400).send({status: "error", error: "credenciales inválidas"})
    const access_token = generateToken(user)
    res.cookie("authToken", access_token).send({status: "success", access_token})
})

authRouter.get("/current", authToken, (req, res) =>{
    res.send("Estas logueado")
})

export default authRouter;