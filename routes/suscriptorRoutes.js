import express from "express";
import { agregarSuscriptor } from "../controllers/suscriptorController.js";
import { enviarLanzamiento } from "../controllers/suscriptorController.js";
import { obtenerSuscriptores } from "../controllers/suscriptorController.js";
const router = express.Router();

router.post("/agregar", agregarSuscriptor);
router.post("/lanzamiento", enviarLanzamiento); // ← Nuevo

export default router;

router.get("/", obtenerSuscriptores);
