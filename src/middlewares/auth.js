export const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        next()
    }else{
        res.render("login", {status: "No estas logueado"})
    }
};