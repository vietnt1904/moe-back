import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const UserStory = sequelize.define(
  "UserStory",
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
    storyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    lastChapter: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    isFinish: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isSave: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isSubcribe: { // to recive notice
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: "UserStories",
    timestamps: true,
  }
);

UserStory.associate = function (models) {
  UserStory.belongsTo(models.Story, {
    foreignKey: "storyId",
    as: "Story",
  });

  UserStory.belongsTo(models.User, {
    foreignKey: "userId",
    as: "User",
  });
};

export default (sequelize, DataTypes) => {
  return UserStory;
};
