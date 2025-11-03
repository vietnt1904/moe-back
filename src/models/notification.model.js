import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    storyUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "Notifications", timestamps: true }
);

Notification.associate = function (models) {
  Notification.belongsTo(models.User, {
    foreignKey: "userId",
    as: "User",
  });
};

export default (sequelize, DataTypes) => {
  return Notification;
};
