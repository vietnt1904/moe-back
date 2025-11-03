import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const UserAuthor = sequelize.define(
  "UserAuthor",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
    authorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Authors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    isSubscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "UserAuthors",
    timestamps: false,
  }
);

UserAuthor.associate = function (models) {
  UserAuthor.belongsTo(models.User, { foreignKey: "userId", as: "User" });
};

export default (sequelize, DataTypes) => {
  return UserAuthor;
};
