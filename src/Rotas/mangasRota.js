import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const mangasRota = express.Router();

mangasRota.get('/', async (req, res) => {
  try {
    const { manga } = req.query;

    if (!manga) {
      return res.status(400).json({ error: 'Informe um manga para buscar as informações.' });
    }

    const mangas = await prisma.Manga.findMany({
      where: {manga: {
          contains: manga, 
          mode: 'insensitive' }
    }});

    if (!mangas) {
      return res.status(404).json({ error: 'Mangá não encontrado.' });
    }

    res.json(mangas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o mangá.' });
  }
});


mangasRota.post('/', async (req, res) => {

   await prisma.Manga.create({

        data: {
            manga: req.body.manga,
            capitulo: req.body.capitulo
           
    }})

    res.status(201).json(req.body)
})


mangasRota.put('/:id', async (req, res) => {

   await prisma.Manga.update({
        where: {
            id: req.params.id
        },
       data: {
            manga: req.body.manga,
            capitulo: req.body.capitulo
           
    }})
    res.status(201).json(req.body)
})

mangasRota.delete('/:id', async (req, res) => {
    await prisma.Manga.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Mangá deletado com sucesso'})
})

export default mangasRota;