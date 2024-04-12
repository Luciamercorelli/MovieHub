import { Request, Response } from "express";
import prisma from "../db/client";

export const createMovie = async (req: Request, res: Response) => {
  const { name, image, genres } = req.body;
  const userId = parseInt(req.params.userId);

  if (!name || !image) {
    return res
      .status(400)
      .send({ message: "The fields name and image are required" });
  }

  if (!userId) {
    return res.status(400).send({ message: "The field userId is required" });
  }

  try {
    const movie = await prisma.$transaction(async (prisma) => {
      // 1. Create movie
      const newMovie = await prisma.movies.create({
        data: {
          name: name,
          image: image,
          userId: userId,
        },
      });

      // 2. movie genres
      if (genres && genres.length) {
        const createGenres = genres.map((genreId: number) => ({
          movieId: newMovie.id,
          genreId: genreId,
        }));

        await prisma.moviegenre.createMany({
          data: createGenres,
        });
      }
      // 3. created movie
      return prisma.movies.findUnique({
        where: {
          id: newMovie.id,
        },
        include: {
          genre: true,
        },
      });
    });

    res.status(201).send({
      msg: "Movie created successfully",
      data: movie,
      typeof: typeof movie,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const allMovies = await prisma.movies.findMany();
    res.status(201).send(allMovies);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllMovie = async (req: Request, res: Response) => {
  try {
    const AllMovies = await prisma.movies.findMany();
    res.status(201).send(AllMovies);
  } catch (error) {
    res.status(400).send(error);
  }
};
