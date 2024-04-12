import { Router } from "express";
import { createGenres, getAllGenres } from "../controllers/genre.controllers";

const genresRoutes = Router();

genresRoutes.get("/", getAllGenres);
genresRoutes.post("/", createGenres);

export default genresRoutes;
