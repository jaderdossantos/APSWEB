import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const musicasRota = express.Router();

musicasRota.get("/", async (req, res) => {
  try {
    const { nome } = req.query;

    if (!nome) {
      return res
        .status(400)
        .json({ error: "Informe um nome para buscar a música." });
    }

    const musicas = await prisma.Musica.findMany({
      where: { 
        nome : { contains: nome, mode: 'insensitive' } 
      },
    });

    if (musicas.length === 0) {
      return res.status(404).json({ error: "Música não encontrada." });
    }

    res.json(musicas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a música." });
  }
});

musicasRota.post("/", async (req, res) => {
  await prisma.Musica.create({
    data: {
      nome: req.body.nome,
      artista: req.body.artista,
    },
  });

  res.status(201).json(req.body);
});

musicasRota.put("/:id", async (req, res) => {
  await prisma.Musica.update({
    where: {
      id: req.params.id,
    },
    data: {
      nome: req.body.nome,
      artista: req.body.artista,
    },
  });
  res.status(201).json(req.body);
});

musicasRota.delete("/:id", async (req, res) => {
  await prisma.Musica.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Música deletada com sucesso" });
});

export default musicasRota;
