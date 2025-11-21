import express from "express";
import Personaje from "../models/Personaje.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// LISTAR
router.get("/", async (req, res) => {
  try {
    const personajes = await Personaje.find();
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// CREAR
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const nuevo = new Personaje({
      nombre: req.body.nombre,
      rol: req.body.rol,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.filename : null,
    });

    await nuevo.save();
    res.json(nuevo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al crear personaje" });
  }
});

// EDITAR
router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const data = {
      nombre: req.body.nombre,
      rol: req.body.rol,
      descripcion: req.body.descripcion,
    };

    if (req.file) {
      data.imagen = req.file.filename;
    }

    const actualizado = await Personaje.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(actualizado);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error al actualizar personaje" });
  }
});

// ELIMINAR
router.delete("/:id", async (req, res) => {
  try {
    await Personaje.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Personaje eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar el personaje" });
  }
});

export default router;
