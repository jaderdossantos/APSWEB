import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const usuariosRota = express.Router();

// Listar usuários
usuariosRota.get('/', async (req, res) => {

    const usuarios = await prisma.Usuario.findMany()

    res.status(200).json(usuarios)
})


// Criar usuário
usuariosRota.post('/', async (req, res) => {

   await prisma.Usuario.create({

        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
    }})

    res.status(201).json(req.body)
})

// Atualizar usuário
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
// Deletar usuário
usuariosRota.delete('/:id', async (req, res) => {
    await prisma.Usuario.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Usuário deletado com sucesso'})
})

export default usuariosRota;