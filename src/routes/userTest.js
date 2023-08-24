import { Router } from "express";
import { generateUsuarios} from "../mocks/userTest.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateUserErrorInfo, generateUidErrorInfo } from "../services/errors/info.js";

const userTestRouter = Router();

const uUsers = [];

userTestRouter.get("/mockingproducts", (req, res) => {
    let user = generateUsuarios(1)
    res.send(user)
});

userTestRouter.get('/', (req, res) => {
    res.send({ status: 'success', payload: uUsers })
});

userTestRouter.post("/", (req, res) => {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        CustomError.createError({
            name: "Error al registrar usuario",
            cause: generateUserErrorInfo({ first_name, last_name, email }),
            message: "Error, uno o mas parametros no son validos",
            code: EErrors.INVALID_TYPES
        })
    }

    const user = {
        first_name,
        last_name,
        email
    }

    uUsers.push(user);
    res.send({status: "succes", payload: user})
})

userTestRouter.get("/:uid", (req, res) => {
    const uid = parseInt(req.params.uid);
    if (isNaN(uid) || uid < 0 || uid === undefined) {
        CustomError.createError({
            name: "Error al obtener el uid",
            cause: generateUidErrorInfo(req.params.uid),
            message: "Error, el uid debe ser un numero",
            code: EErrors.INVALID_PARAM
        })
    }

    res.send({uid})
})

export default userTestRouter;