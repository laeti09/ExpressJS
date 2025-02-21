const menu = require("../datas/menu.json")

const adminController = {
    getAdminForm: (req, res) => {
        res.render("admin");
    },
    postForm: (req, res) => {
        const { nom, prix, description, image, allergene, ingredient, type } = req.body;
        // console.log("Nom :", nom);
        // console.log("Prix :", prix);
        // console.log("Description :", description);
        // console.log("Allergene :", allergene);
        // console.log("ingredient :", ingredient);
        // console.log("Type :", type);

        if (!nom || !description || !prix || !allergene || !ingredient || !type) {
            return res.status(403).json({ error: "Le formulaire n'est pas rempli" });
        }

        const plat = {
            id: ++menu[type].slice(-1)[0].id,
            nom,
            prix,
            description,
            image,
            "allergenes": [allergene],
            "ingredients": [ingredient]
        }

        console.log("Nouveau ID:", plat.id);
        menu[type].push(plat);

        res.render("admin", {
            message: "Votre plat a été enregistré !"
        })
    }
};

module.exports = adminController;