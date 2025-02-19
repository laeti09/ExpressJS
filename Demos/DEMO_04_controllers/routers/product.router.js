const router = require("express").Router();
const productController = require('../controllers/product.controller');


// () => {} NOOP est une fonction vide qui n'a aucune application réelle si ce n'est que bloquer l'exécution d'une fonction par une labmda vide
// C'est un placeholder

router.get("/", productController.getAll);
router.get("/details/:id", productController.getDetails);

module.exports = router;


