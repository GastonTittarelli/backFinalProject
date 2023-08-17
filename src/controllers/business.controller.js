import Business from "../DAO/BusinessDAO.js"

const businessService = new Business();

export const getBusiness = async (req, res) => {
    let result = await businessService.getBusiness();
    if(!result) return res.status(500).send({status: "error", error: "Error getting all business"})
    res.send({status: "success", result})
}

export const getBusinessById = async (req, res) => {
    const { bid } = req.params;
    let result = await businessService.getBusinessById(bid);
    if(!result) return res.status(500).send({status: "error", error: "Error getting business"})
    res.send({status: "success", result})
}

export const createBusiness = async (req, res) => {
    const business = req.body;
    let result = await businessService.createBusiness(business);
    if(!result) return res.status(500).send({status: "error", error: "Error creating business"})
    res.send({status: "success", result})
}

export const addProduct = async (req, res) => {
    let product = req.body;
    let business = await businessService.getBusinessById(req.params.bid);
    business.products.push(product);
    let result = await businessService.updateBusiness(business._id, business);
    if(!result) return res.status(500).send({status: "error", error: "Error updating business"})
    res.send({status: "success", result: "Business updated"})
}