import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const Rate = sequelize.define(
  "Rate",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      defaultValue: "0",
    },
    storyId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Rates",
    timestamps: true,
  }
);

Rate.associate = (models) => {
  Rate.belongsTo(models.User, {
    foreignKey: "userId",
    as: "User",
  });

  Rate.belongsTo(models.Story, {
    foreignKey: "storyId",
    as: "Story",
  });
};

export default (sequelize, DataTypes) => {
  return Rate;
};
