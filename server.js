import express from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', async (req, res) => {

   await prisma.Usuario.create({

        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
    }})

    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    const usuarios = await prisma.Usuario.findMany()

    res.status(200).json(usuarios)
})


app.put('/usuarios/:id', async (req, res) => {

   await prisma.Usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
    }
})
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.Usuario.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: 'Usuário deletado com sucesso'})
})


app.listen(3000)