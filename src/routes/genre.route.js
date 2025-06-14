import express from "express";
import { getAllGenres } from "../controllers/genre.controller.js";

const genreRouter = express.Router();

genreRouter.get("/", getAllGenres);

export default genreRouter;