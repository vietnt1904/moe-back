import GenreService from "../services/genre.service.js";

export const getAllGenres = async (req, res) => {
    try {
        const genres = await GenreService.getAllGenres();
        res.status(200).json({
            success: true,
            message: "Get all genres successfully",
            genres: genres,
        });
    } catch (error) {
        console.error("Error get all genres:", error);
        return res.status(500).json({
            success: false,
            error: `An error occurred during get all genres! ${error}.`,
        });
    }
};

export const createGenre = async (req, res) => {
    try {
        const genre = await GenreService.createGenre(req.body);
        res.status(200).json({
            success: true,
            message: "Create genre successfully",
            genre: genre,
        });
    } catch (error) {
        console.error("Error create genre:", error);
        return res.status(500).json({
            success: false,
            error: `An error occurred during create genre! ${error}.`,
        });
    }
};