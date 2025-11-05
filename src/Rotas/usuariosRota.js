import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const usuariosRota = express.Router();


usuariosRota.get('/', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Informe um e-mail para buscar o usuário.' });
    }

    const usuario = await prisma.Usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
});


usuariosRota.post('/', async (req, res) => {

   await prisma.Usuario.create({

        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
    }})

    res.status(201).json(req.body)
})


usuariosRota.put('/:id', async (req, res) => {

   await prisma.Usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            senha: req.body.senha
                }
})
    res.status(201).json(req.body)
})

usuariosRota.delete('/:id', async (req, res) => {
    await prisma.Usuario.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Usuário deletado com sucesso'})
})

export default usuariosRota;