import { Genre } from "../models/genre.model.js";

const GenreService = {
  async getAllGenres() {
    try {
      const genres = await Genre.findAll({ where: { isActive: true } });
      return genres;
    } catch (error) {
      console.error("Error get all genres:", error);
      throw error;
    }
  },

  async getAdminGenres() {
    try {
      const genres = await Genre.findAll();
      return genres;
    } catch (error) {
      console.error("Error get admin genres:", error);
      throw error;
    }
  },

  async createGenre(genre) {
    try {
      const isExit = await Genre.findOne({ where: { name: genre?.name } });
      if (isExit) {
        return {
          success: false,
          message: "Tên thể loại đã tồn tại. Hãy thử lại!",
        };
      }
      const newGenre = await Genre.create(genre);
      return { success: true, data: newGenre };
    } catch (error) {
      console.error("Error create genre:", error);
      throw error;
    }
  },

  async updateGenre(id, genre) {
    try {
      const updateGenre = await Genre.update(genre, { where: { id } });
      return updateGenre;
    } catch (error) {
      console.error("Error update genre:", error);
      throw error;
    }
  },
};

export default GenreService;
