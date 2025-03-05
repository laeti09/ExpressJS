const db = require('../models');
const Vehicule = db.vehicule;
const Client = db.client;
const Intervention = db.intervention;
const TypeIntervention = db.typeIntervention;

const VehiculeController = {
    create: async (req, res) => {
        try {

            const { clientId, immatriculation, marque, modele, annee, type } = req.body;

            if (!clientId || !immatriculation || !marque || !modele || !annee) {
                return res.status(400).send({
                    message: "Tous les champs sont obligatoires."
                })
            }

            const client = await Client.findByPk(clientId);

            if (!client) {
                return res.status(404).send({
                    message: `Le client avec l'id : ${clientId} n'existe pas`
                })
            }

            const newVehicule = {
                clientId,
                immatriculation,
                marque,
                modele,
                annee,
                type: type || "Autre"
            };

            const vehicule = await Vehicule.create(newVehicule);

            res.status(201).send(vehicule);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },
    findAll: async (req, res) => {
        try {

            const vehicules = await Vehicule.findAll({
                include: [{
                    model: Client,
                    as: "client",
                    attributes: ["id", "nom", "prenom", "email"]
                }],
                order: [["marque", "ASC"]]
            });

            res.status(200).send(vehicules);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },
    findOne: async (req, res) => {
        try {
            const id = req.params.id;

            const vehicule = await Vehicule.findByPk(id, {
                include: [
                    {
                        model: Client,
                        as: "client",
                        attributes: [
                            "id", "nom", "prenom", "email", "telephone"
                        ]
                    },
                    {
                        model: Intervention,
                        as: "Interventions"
                    }
                ]
            });


            if (!vehicule) {
                return res.status(404).send({
                    message: `Le véhicule avec l'id : ${id} n'existe pas.`
                });
            }

            res.status(200).send(vehicule);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },
    update: async (req, res) => {
        try {

            const id = req.params.id;

            const [updated] = await Vehicule.update(
                { ...req.body },
                {
                    where: { VehiculeID: id }
                }
            )


            if (updated === 0) {
                return res.status(404).send({
                    message: `Le véhicule avec l"id : ${id} n'existe pas ou aucune modification n'a été effectuée`
                })
            }

            res.status(200).send({
                message: "Le véhicule à bien été mis à jour."
            })
        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },
    delete: async (req, res) => {
        try {

            const id = req.params.id;

            const interventions = await Intervention.findAll({
                where: {
                    VehiculeID: id
                }
            })

            if (interventions.length > 0) {
                return res.status(400).send({
                    message: "Impossible de supprimer le véhicule car des interventions y son associées"
                })
            }

            const deleted = await Vehicule.destroy({
                where: { VehiculeID: id }
            })

            if (deleted === 0) {
                return res.status(404).send({
                    message: `Le véhicule avec l"id : ${id} n'existe pas.`
                })
            }

            res.status(200).send({ message: "Vehicule correctement supprimé." })

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },
    findByType: async (req, res) => {
        try {

            const vehicules = await Vehicule.findAll({
                include: [
                    {
                        model: Client,
                        as: "client",
                        attributes: ["id", "nom", "prenom"]
                    }
                ],
                order: [["type", "ASC"]]
            });

            const vehiculesByType = vehicules.reduce((acc, vehicule) => {
                // A chaque itération on extrait le type du véhicule sur lequel on itère
                const type = vehicule.type;

                // Vérification de l'existence type de véhicule sur lequel on itère 
                // S'il n'existe pas, on l'initialise en un tableau vide
                if (!acc[type]) {
                    acc[type] = [];
                }

                // Ajoutes le véhicule sur lequel on itère dans le tableau correspondant à son type si l'a clé existe dans l'acc
                acc[type].push(vehicule);

                return acc;

            }, {});

            res.status(200).send(vehiculesByType);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },

    getInterventionHistory: async (req, res) => {
        try {

            const id = req.params.id;

            const interventions = await Intervention.findAll({
                where: { VehiculeID: id },
                include: [
                    {
                        model: TypeIntervention,
                        as: "type"
                    }
                ],
                order: [["date_intervention", "DESC"]]
            });

            res.status(200).send(interventions);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête.`,
                error
            });
        }
    },

}

module.exports = VehiculeController;