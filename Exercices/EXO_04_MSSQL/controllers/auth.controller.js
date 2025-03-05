const bvrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { use } = require('../routers/auth.router');
const User = db.user;

const AuthController = {
    register: async (req, res) => {
        try {

            const { username, email, password, role } = req.body;

            if (!username || !email || !password) {
                return res.status(400).send({
                    message: "Le nom d'utilisateur, l'email et le mot de passe sont obligatoires"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                username,
                email,
                password: hashedPassword,
                role: role || "user"
            }

            const user = await User.create(newUser);

            res.status(201).send(user);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    },
    login: async (req, res) => {
        try {

            const { username, password } = req.body;

            const user = User.findOne({
                where: {
                    username
                }
            })

            if (!user) {
                return res.status(404).send({
                    message: "L'utilisateur n'existe pas"
                })
            }

            const passworsIsValid = await bcrypt.compare(password, user.password);

            if (!passworsIsValid) {
                return res.status(401).send({
                    message: "Mot de passe incorrect0"
                })
            }

            if (!user.active) {
                return res.status(403).send({
                    message: "Votre compte est désactivé. Veuillez contacter un administrateur"
                })
            }

            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: parseInt(process.env.JWT_EXPIRATION)
                }
            );

            res.status(200).send({
                user,
                token,
                expiresIn: parseInt(process.env.JWT_EXPIRATION)
            });


        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    },
}

module.exports = AuthController;