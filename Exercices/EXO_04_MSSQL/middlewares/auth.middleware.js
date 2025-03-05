const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: "Aucun token de fourni. Accès refusé."
        })
    }

    // token = Bearer TOKEN
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                message: "Token invalide. Accès refusé."
            });
        }

        req.userId = decoded.id
        next();
    })

};

isAdmin = async (req, res, next) => {
    try {

        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send({
                message: "Utilisateur introuvable"
            })
        }

        if (user.role !== "admin") {
            return res.status(403).send({
                message: "Accès refusé. Rôle administrateur requis pour cette action"
            })
        }

        next();

    } catch (error) {
        res.status(500).send({
            error
        })
    }
};

const authMiddleware = {
    verifyToken,
    isAdmin
};

//Jsonwebtoken => permet de transmettre des infos entre le client et le serveur
// Utile pour l'authentification d'un utilisateur et transmettre certaines infos
// JWT est lisible donc on ne met pas d'infos sensibles

module.exports = authMiddleware;

