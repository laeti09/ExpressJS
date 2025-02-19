const express = require("express");
const path = require("path");
const router = require('./routers');

const app = express();
const PORT = 3000;


// extended: true => utilisation de la librairie express qs ()
// ! Avec qs (extended: true)
// {
//     user: {
//         user_name: 'Kévin',
//         user_age: 39,

//     }
// }
// extended: false => utilisation de la librairie express querystring
// ! Avec querystring (extended: false)
// {
//     user[user_name]: 'Kévin',
//     user[user_age]: 39
// }

// On utilise extended true car le formatage de express qs est plus convénient

//urlencoded va nous permettre de parse des informations envoyées au format "application/x-ww-form-urlencoded"
// URL => user%5Bname%5D=Kevin&user%5Bage%5D=39
// URL traduite => user_name=Kevin&user_age=39
app.use(express.urlencoded({ extended: true }));

// ? Initialiser le moteur de vue
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// ? Initialisation de l'utilisation des fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🟢`);
});