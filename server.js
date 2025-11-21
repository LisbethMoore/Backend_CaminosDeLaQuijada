import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path";
import userRoutes from "./routes/userRoutes.js";
import personajeRoutes from "./routes/personajeRoutes.js";
import suscriptorRoutes from "./routes/suscriptorRoutes.js";
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use("/api/suscriptores", suscriptorRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


connectDB();

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use("/api/users", userRoutes);
app.use("/api/personajes", personajeRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
