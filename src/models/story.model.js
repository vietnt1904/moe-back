import DataTypes from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { slugify } from "../utils/index.js";

export const Story = sequelize.define(
  "Story",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorName: {
      // tên tác giả của câu chuyện
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      // id của người đăng câu chuyện
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("original", "translated"),
      allowNull: false,
    },
    releaseSchedule: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    timeline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ending: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is18Plus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    star: {
      // tổng số sao
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "active",
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
    rating: {
      // Tổng số rate
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    followers: {
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
    finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    isLock: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "Stories",
    timestamps: true,
    hooks: {
      beforeValidate: (story) => {
        if (!story.slug && story.title) {
          story.slug = slugify(story.title);
        }
      },
    },
  }
);

// Associations
Story.associate = (models) => {
  Story.belongsTo(models.User, {
    foreignKey: "authorId",
    as: "Author",
  });

  // Nhiều-nhiều với Topic
  Story.belongsToMany(models.Topic, {
    through: "StoryTopics",
    foreignKey: "storyId",
    otherKey: "topicId",
    as: "Topics",
  });

  // Nhiều-nhiều với Genre
  Story.belongsToMany(models.Genre, {
    through: "StoryGenres",
    foreignKey: "storyId",
    otherKey: "genreId",
    as: "Genres",
  });

  Story.hasMany(models.Chapter, {
    foreignKey: "storyId",
    as: "Chapters",
  });

  Story.hasMany(models.Comment, {
    foreignKey: "storyId",
    as: "Comments",
  });

  Story.hasMany(models.Rate, {
    foreignKey: "storyId",
    as: "Rates",
  });
};

export default (sequelize, DataTypes) => {
  return Story;
};
