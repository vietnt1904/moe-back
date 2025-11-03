import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Banner = sequelize.define(
    "Banner",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date(),
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    },
    {
        tableName: "Banners",
        timestamps: true,
    }
);

export default (sequelize, DataTypes) => {
    return Banner;
};