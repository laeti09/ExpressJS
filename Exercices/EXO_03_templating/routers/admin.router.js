const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/", adminController.getAdminForm);
router.post("/", adminController.postForm);

module.exports = router;