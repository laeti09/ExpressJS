const router = require("express").Router();
const clientController = require("../controllers/client.controller");

// ? Import du clientController 
// ? Import du middleware d'auth

// Différente écriture
// router.route("/")
//     .get()
//     .post()

// router.route('/:id')
//     .get()
//     .post()
//     .patch()

// Mettre les routes qui utilise les params en dernier  exemple : /details/:detailsid passe avant /:id, "" passe avant "/:id"
router.get('', clientController.findAll);
router.post('', clientController.create);
router.get('/:id', clientController.findOne);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);


module.exports = router;
