const HomeController = {
    getHome: (req, res) => {
        res.render("home", {
            restaurant
        });
    },
};

module.exports = HomeController;