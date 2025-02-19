const router = require('express').Router();

const products = [
    {
        id: 1,
        name: "Orange",
        description: "Fruit comestible de l'oranger, de forme sphérique à ovale, à la peau orangé rougeâtre contenant une huile essentielle d'odeur caractéristique et dont la pulpe est juteuse et sucrée.",
        image: "oranges.webp",
        price: 1.55,
        available: false,
    },
    {
        id: 2,
        name: "Pomme",
        description: "La pomme fait partie des fruits à pépins (charnus). Les pommes récoltées varient considérablement en taille, forme, couleur et acidité, mais la plupart sont assez rondes et d'une nuance de rouge ou de jaune .",
        image: "pommes.jpg",
        price: 1.25,
        available: true,
    },
    {
        id: 3,
        name: "Cerise",
        description: "La cerise est un petit fruit à la chair de couleur rouge, gorgé de jus sucré, et contenant en son centre un petit noyau.",
        image: "cerises.webp",
        price: 0.95,
        available: false,
    },
    {
        id: 4,
        name: "Fraise",
        description: "Les fraises sont des baies rouges, douces et sucrées . Elles sont également délicieuses. Les fraises contiennent de minuscules graines comestibles qui poussent sur toute leur surface. Lorsqu'elles sont mûres, les fraises sentent merveilleusement bon et ont un goût encore meilleur.",
        image: "fraises.webp",
        price: 1.80,
        available: true,
    },
    {
        id: 5,
        name: "Kiwi",
        description: "Le kiwi à l'allure ronde et légèrement duveteuse cache sous sa peau brune une pulpe verte, sucrée, acidulée et des centaines de minuscules graines noires. Consommer ce fruit c'est s'assurer un plein d'énergie !",
        image: "kiwi.jfif",
        price: 1.99,
        available: true,
    },
];

router.get("/", (req, res) => {
    res.status(200).render('product/index', {
        title: "Liste des produits",
        products
    })
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return res.status(404).json({ error: "Le produit n'existe pas" });
    }

    res.status(200).render('product/details', {
        title: "Détails",
        product
    })
})

module.exports = router;