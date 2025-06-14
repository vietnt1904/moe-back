import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Genre = sequelize.define(
    "Genre",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Genres",
        timestamps: true,
    }
);

Genre.associate = function (models) {
    Genre.belongsToMany(models.Story, {
        through: "StoryGenres",
        foreignKey: "genreId",
        otherKey: "storyId",
        as: "Stories",
    });
};

export default (sequelize, DataTypes) => {
    return Genre;
};