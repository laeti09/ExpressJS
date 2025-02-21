const restaurant = {
    description: "Bienvenue dans notre restaurant, de nombreaux plats délicieux vous attendent !",
    platsPhares: ["Pastilla aux fruits de mer", "Gaspacho de courgette au curcuma"]
};

const homeController = {
    getHome: (req, res) => {
        res.render("home", { restaurant });
    }
};

module.exports = homeController;