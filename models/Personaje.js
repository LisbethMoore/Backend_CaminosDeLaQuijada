import mongoose from "mongoose";

const PersonajeSchema = new mongoose.Schema({
  nombre: String,
  rol: String,
  descripcion: String,
  imagen: String,
});

export default mongoose.model("Personaje", PersonajeSchema);
 