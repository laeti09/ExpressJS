const { removeTicks } = require('sequelize/lib/utils');
const db = require('../models');
const vehiculeModel = require('../models/vehicule.model');
const Intervention = db.intervention;
const Vehicule = db.vehicule;
const TypeIntervention = db.typeIntervention;
const Client = db.client;

const InterventionController = {
    create: async (req, res) => {
        try {

            const { vehiculeId, typeId, date_intervention } = req.body;

            if (!vehiculeId || !typeId || !date_intervention) {
                return res.status(400).send({
                    message: "L'id du véhicule, du type d'intervention et la date d'intervention sont obligatoires"
                })
            }

            const vehicule = await Vehicule.findByPk(vehiculeId);
            if (!vehicule) {
                return res.status(404).send({
                    message: `Le véhicule avec l'id : ${vehiculeId} n'existe pas`
                })
            }

            const type = await TypeIntervention.findByPk(typeId)
            if (!type) {
                return res.status(404).send({
                    message: `Le type d'intervention avec l'id ${typeId} n'existe pas`
                })
            }

            const newIntervention = {
                vehiculeId,
                typeId,
                date_intervention,
                description: req.body.description || ""
            }
            const intervention = await Intervention.create(newIntervention);

            res.status(201).send(intervention);


        } catch (error) {

        }
    },
    findAll: async (req, res) => {
        try {

            const interventions = await Intervention.findAll({
                include: [
                    {
                        model: Vehicule,
                        as: "vehicule",
                        include: [
                            {
                                model: Client,
                                as: 'client',
                                attributes: [
                                    "id", "nom", "prenom"
                                ]
                            }
                        ]
                    },
                    {
                        model: TypeIntervention,
                        as: "type"
                    }
                ]
            });

            res.status(200).send(interventions);

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    },
    findOne: async (req, res) => {
        try {

            const id = req.params.id;

            const intervention = await Intervention.findByPk(id, {
                include: [
                    {
                        model: Vehicule,
                        as: "vehicule",
                        include: [
                            {
                                model: Client,
                                as: "client"
                            }
                        ]
                    },
                    {
                        model: TypeIntervention,
                        as: "type"
                    }
                ]
            });

            if (!intervention) {
                return res.status(404).send({
                    message: `L'intervention avec l'id : ${id} n'existe pas`
                })
            }

            res.status(200).send(intervention);
        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const { typeId, prix, ...rest } = req.body;

            if (typeId && !prix) {
                const type = await TypeIntervention.findByPk(typeId);

                if (type) {
                    prix = type.prix_base;
                }
            }

            const [updated] = await Intervention.update(
                { typeId, prix, ...rest },
                {
                    where: { InterventionID: id }
                }
            );

            if (updated === 0) {
                return res.status(404).send({
                    message: `L'intervention avec l'id : ${id} n'existe pas ou aucune modification effectuée`
                });
            }

            res.status(200).send({
                message: "Intervention modifiée avec succès"
            });

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    },
    delete: async (req, res) => {
        try {

            const id = req.params.id;

            const deleted = await Intervention.destroy({
                where: {
                    InterventionID: id
                }
            })

            if (deleted === 0) {
                return res.status(404).send({
                    message: `L'intervention avec l'id : ${id} n'existe pas`
                });
            }

            res.status(200).send({
                message: "L'intervention correctement supprimée"
            })

        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    },
    updateStatus: async (req, res) => {
        try {
            const id = req.params.id;
            const { statut } = req.body;

            if (!statut) {
                return res.status(400).send({
                    message: 'Le nouveau statut est obligatoire'
                })
            }

            const statusValides = ["Planifiée", "En cours", "Terminée", "Annulée"];

            if (!statusValides.includes(statut)) {
                return res.status(400).send({
                    message: `Statut invalide. Les statuts corrects sont = ${statusValides.join(", ")}`
                })
            }

            const [updated] = await Intervention.update({
                statut
            },
                {
                    where: { InterventionID: id }
                }
            );

            if (updated === 0) {
                return res.status(400).send({
                    message: `L'intervention avec l'id : ${id} n'existe pas`
                })
            }

            res.status(200).send({
                message: "Le statut de l'intervention a été mis à jour."
            });


        } catch (error) {
            res.status(500).send({
                message: `Une erreur est survenue lors de la requête`,
                error
            });
        }
    }
}

module.exports = InterventionController;
