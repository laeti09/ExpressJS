const menu = require("../datas/menu.json");

const menuController = {
    getMenu: (req, res) => {
        res.render("menu", { menu });
    },
    getMenuDetails: (req, res) => {
        const id = parseInt(req.params.id);
        const type = req.params.type;

        if (type !== "entrees" && type !== "plats" && type !== "desserts") {
            return res.status(404).json({ error: "Ce type de plat n'existe pas" });
        }
        const plat = menu[type].find(p => p.id === id);

        if (!plat) {
            return res.status(404).json({ error: `Le plat ${id} n'existe pas.` });
        }

        res.render("details", { plat });
    },



};

module.exports = menuController;