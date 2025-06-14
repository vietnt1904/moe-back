import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const ReasonUpdate = sequelize.define(
  "ReasonUpdate",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    storyId: {
      // hoặc thay bằng storyId
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Stories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("accept", "reject", "draff"),
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ReasonUpdates",
    timestamps: true,
  }
);

ReasonUpdate.associate = (models) => {
  ReasonUpdate.belongsTo(models.Story, {
    foreignKey: "storyId",
    as: "Story",
  });
};

export default (sequelize, DataTypes) => {
  return ReasonUpdate;
};
