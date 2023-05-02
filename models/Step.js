const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Step extends Model {};

Step.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'recipe',
              key: 'id',
            }
        },
        step: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'step',
    }
);

module.exports = Step;