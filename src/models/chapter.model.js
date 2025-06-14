import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { slugify } from "../utils/index.js";

export const Chapter = sequelize.define(
  "Chapter",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    chapterNumber: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    storyId: {
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
      type: DataTypes.ENUM(
        "savedraft",
        "pending",
        "published",
        "rejected",
        "suspended",
        "error"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "Chapters",
    timestamps: true,
    indexes: [
      {
        fields: ["storyId", "chapterNumber"],
      },
    ],
    hooks: {
      beforeValidate: (chapter) => {
        if (!chapter.slug && chapter.title) {
          chapter.slug = slugify(chapter.title);
        }
      },
    },
  }
);

Chapter.associate = function (models) {
  Chapter.belongsTo(models.Story, {
    foreignKey: "storyId",
    as: "Story",
  });
};

export default (sequelize, DataTypes) => {
  return Chapter;
};
