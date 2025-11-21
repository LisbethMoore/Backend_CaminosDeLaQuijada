import Personaje from '../models/Personaje.js';

// Crear personaje
export const crearPersonaje = async (req, res) => {
  try {
    const personaje = await Personaje.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file ? req.file.path : null
    });

    res.json(personaje);
  } catch (error) {
    res.status(500).json({ error: "Error al crear personaje" });
  }
};

// Listar personajes
export const listar = async (req, res) => {
  try {
    const personajes = await Personaje.find();
    res.json(personajes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
};
