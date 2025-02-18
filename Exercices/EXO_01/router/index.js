const router = require('express').Router();

let users = [];

router.get('/users', (req, res) => {
    res.status(200).json(users);
})

router.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ "message": "L'utilisateur n'a pas été trouvé" });
    }

})

router.post('/users', (req, res) => {
    const { username, email } = req.body;
    const user = {
        id: users.length + 1,
        username,
        email
    }

    users.push(user);

    res.status(201).json(users);
})

router.patch('/users/:id', (req, res) => {
    const { username, email } = req.body;
    const idUser = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === idUser);

    if (userIndex !== -1) {
        users[userIndex] = {
            id: idUser,
            username,
            email
        }

        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ "message": "L'utilisateur n'a pas été trouvé" });
    }

})

router.delete('/users/:id', (req, res) => {
    const idUser = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === idUser);


    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(200).json(users);
    }
    else {
        res.status(404).json({ "message": "L'utilisateur n'a pas été trouvé" });
    }

})

module.exports = router;