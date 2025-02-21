const router = require("express").Router();
const menuController = require("../controllers/menu.controller");

router.get("/", menuController.getMenu);
router.get("/details/:type/:id", menuController.getMenuDetails);

module.exports = router;