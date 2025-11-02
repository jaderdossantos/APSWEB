import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import usuariosRota from "./Rotas/usuariosRota.js";
import loginRota from "./Rotas/loginRota.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rotas organizadas
app.use("/usuarios", usuariosRota);
app.use("/login", loginRota);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));