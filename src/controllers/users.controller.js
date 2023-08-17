import User from "../DAO/User3DAO.js"

const userService = new User();

export const getUsers = async (req, res) => {
    let result = await userService.getUsers();
    if(!result) return res.status(500).send({status: "error", error: "Error getting all users"})
    res.send({status: "success", result})
}

export const getUsersById = async (req, res) => {
    const { uid } = req.params;
    let user = await userService.getUsersById(uid);
    if(!result) return res.status(500).send({status: "error", error: "Error getting user"})
    res.send({status: "success", result: user})
}

export const saveUsers = async (req, res) => {
    const user = req.body;
    let result = await userService.saveUser(user);
    if(!result) return res.status(500).send({status: "error", error: "Error saving user"})
    res.send({status: "success", result})
}