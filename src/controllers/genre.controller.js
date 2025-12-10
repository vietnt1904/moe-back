import GenreService from "../services/genre.service.js";

export const getAllGenres = async (req, res) => {
  try {
    const genres = await GenreService.getAllGenres();
    return res.status(200).json({
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

export const getAdminGenres = async (req, res) => {
  try {
    const genres = await GenreService.getAdminGenres();
    return res.status(200).json({
      success: true,
      message: "Get admin genres successfully",
      genres: genres,
    });
  } catch (error) {
    console.error("Error get admin genres:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during get admin genres! ${error}.`,
    });
  }
};

export const createGenre = async (req, res) => {
  try {
    const genre = await GenreService.createGenre(req.body);
    if (genre?.success) {
      const genres = await GenreService.getAllGenres();
      return res.status(200).json({
        success: true,
        message: "Create genre successfully",
        genre: genre?.data,
      });
    } else {
      res.status(200).json({
        success: false,
        message: genre?.message,
      });
    }
  } catch (error) {
    console.error("Error create genre:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during create genre! ${error}.`,
    });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await GenreService.updateGenre(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Update genre successfully",
      genre: genre,
    });
  } catch (error) {
    console.error("Error update genre:", error);
    return res.status(500).json({
      success: false,
      error: `An error occurred during update genre! ${error}.`,
    });
  }
};
