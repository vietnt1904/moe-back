import { Genre } from "../models/genre.model.js";

const GenreService = {
    async getAllGenres() {
        try {
        const genres = await Genre.findAll();
        return genres;
        } catch (error) {
        console.error("Error get all genres:", error);
        throw error;
        }
    },

    async createGenre(genre) {
        try {
        const newGenre = await Genre.create(genre);
        return newGenre;
        } catch (error) {
        console.error("Error create genre:", error);
        throw error;
        }
    },
};

export default GenreService;