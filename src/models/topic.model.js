import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Topic = sequelize.define(
    "Topic",
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
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        tableName: "Topics",
        timestamps: true,
    }
);

Topic.associate = (models) => {
    Topic.belongsToMany(models.Story, {
        through: "StoryTopics",
        foreignKey: "topicId",
        otherKey: "storyId",
        as: "Stories",
    });
};

export default (sequelize, DataTypes) => {
    return Topic;
};