import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Comment = sequelize.define(
    "Comment",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        chapterId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "Chapters",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        dislikes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "Comments",
        timestamps: true,
    }
);

export default (sequelize, DataTypes) => {
    return Comment;
};