const router = require("express").Router();
const homeRouter = require("./home.router");
const menuRouter = require("./menu.router");
const adminRouter = require("./admin.router");


router.use('/', homeRouter);
router.use('/menu', menuRouter);
router.use('/admin', adminRouter);

module.exports = router;