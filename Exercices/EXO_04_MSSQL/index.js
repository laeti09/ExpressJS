const express = require("express");
const router = require("./routers");

// ? Importation des cors
const cors = require('cors');

const app = express();


// ? Initialisation des cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = process.env;

// ? Import de l'objet db
const db = require('./models');

//  process.env.NODE_ENV === 'development'
db.sequelize.sync({ force:false })
    .then(() => {
        console.log("DB Sync ✨");
        // TODO utilisation du fichier utils
        // if (process.env.NODE_ENV === "development") {
        //     require("./utils/init")();
        // }
    })
    .catch((error) => {
        console.log(`Erreur de synchronisation à la DB ❌, ${error}`);
    })

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🟢`);
});







