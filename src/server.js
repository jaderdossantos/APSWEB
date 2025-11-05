import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import usuariosRota from "./Rotas/usuariosRota.js";
import loginRota from "./Rotas/loginRota.js";
import mangasRota from "./Rotas/mangasRota.js";
import musicasRota from "./Rotas/musicasRota.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRota);
app.use("/login", loginRota);
app.use("/mangas", mangasRota);
app.use("/musicas", musicasRota);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));