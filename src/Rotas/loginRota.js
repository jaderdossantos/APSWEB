import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const loginRota = express.Router();


loginRota.post("/", async (req, res) => {

 try {
     const usuario = await prisma.Usuario.findFirst({
    where: {
      email: req.body.email,
      senha: req.body.senha
    },
  });

  if (!usuario) {
    return res.status(401).json({ error: "Email ou senha incorretos" });
  }
  
  const { senha, ...usuarioSemSenha } = usuario;

  res.json({ message: "Login bem-sucedido!", usuario: usuarioSemSenha });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default loginRota;