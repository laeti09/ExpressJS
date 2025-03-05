module.exports = (sequelize, DataTypes) => {
    const Intervention = sequelize.define('Intervention', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: "InterventionID"
        },
        vehiculeId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            field: 'VehiculeID',
            references: {
                model: "Vehicules",
                key: "VehiculeID"
            }
        },
        typeId: {
            type: DataTypes.UUID,
            defaultValue: false,
            allowNull: false,
            field: "TypeID",
            references: {
                model: "Types_Interventions",
                key: "TypeID"
            }
        },
        date_intervention: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "Date_Intervention",
        },
        statut: {
            type: DataTypes.ENUM("Planifiée", "En cours", "Terminée", "Annulée"),
            defaultValue: "Planifiée",
            field: "Statut",
        },
        prix: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: "Prix",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "Description",
        },

    },
        {
            tableName: 'Interventions',
            hooks: {
                beforeCreate: async (intervention, options) => {
                    if (!intervention.prix) {
                        // ? Si le prix n'est pas indiqué lors de l'insertion de l'intervention
                        // ? On vérifie si le type de l'intervention existe, si oui on récupère son prix de base
                        // ? Et on l'affecte à l'intervention nouvellement créée
                        const TypeIntervention = sequelize.models.TypeIntervention;
                        const type = await TypeIntervention.findByPk(intervention.typeId);

                        if (type) {
                            intervention.prix = type.prix_base;
                        }
                    }
                }
            }
        },
    );

    return Intervention;
};