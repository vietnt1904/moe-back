import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // gender: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // facebook: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // tiktok: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // blog: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backgroundImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spiritStones: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

User.associate = function (models) {
  User.hasMany(models.UserStory, {
    foreignKey: "userId",
    as: "User",
  });
};

export default (sequelize, DataTypes) => {
  return User;
};
