const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.id_usuario = payload.id_usuario;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}

module.exports = verifyToken;