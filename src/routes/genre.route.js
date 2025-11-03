import express from "express";
import {
  createGenre,
  getAllGenres,
  updateGenre,
} from "../controllers/genre.controller.js";

const genreRouter = express.Router();

genreRouter.post("/", createGenre);
genreRouter.patch("/:id", updateGenre);
genreRouter.get("/", getAllGenres);

export default genreRouter;
