const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

let users = [];

// "/users" --> http://localhost:3000/users
// "/users/42"
// "/users/42/details"
// "/products"
// "/" --> http://localhost:3000/


router.get('/users', (req, res) => {
    // 200 : OK
    res.status(200).json(users);
});


router.get('/users/:id', (req, res) => {
    // Le cast avec Number fonctionne si l'id comparé est un number, ce qui n'est plus le cas
    // avec la génération d'UUID dans la création de l'utilisateur
    // const user = utilisateurs.find(user => user.id === Number(req.params.id))
    const user = users.find(user => user.id === req.params.id);
    if (!user) {
        res.status(404).json({ error: `Utilisateur avec l'id : ${req.params.id} n'existe pas` });
    }
    res.status(200).json(user);

});

router.post('/users', (req, res) => {
    const { username, email } = req.body;

    // Simple vérification
    if (!username || !email) {
        // 403 : Unauthorized va permettre de spécifier une erreur côté client
        // On y attache un message détaillant l'erreur
        res.status(403).json({ error: "Username or Email is required" });
    }
    const user = {
        id: uuidv4(),
        username,
        email
    }

    users.push(user);
    res.status(201).json(users);
});

router.patch('/users/:id', (req, res) => {
    const { username, email } = req.body;
    const { id } = req.params;
    const user = users.find(user => user.id === id);

    if (!user) {
        res.status(404).json({ error: `Utilisateur avec l'id : ${id} n'existe pas` });
    }

    user.username = username;
    user.email = email;
    res.status(200).json(users);

});;

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);

    if (!user) {
        res.status(404).json({ error: `Utilisateur avec l'id : ${id} n'existe pas` });
    }
    users = users.filter(user => user.id !== id);

    // 204 : Ok requête effectué avec succès mais pas de réponse
    res.status(204).send();

});

module.exports = router;