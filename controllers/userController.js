import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password } = req.body;

  const existe = await User.findOne({ email });
  if (existe) return res.json({ msg: "Correo ya existe" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hash });

  res.json({ msg: "Usuario creado", user });
};

export const login = async (req, res) => {
  console.log("➡️ BODY RECIBIDO:", req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("➡️ USER ENCONTRADO:", user);

  if (!user) return res.json({ msg: "No existe" });

  const ok = await bcrypt.compare(password, user.password);
  console.log("➡️ PASSWORD MATCH:", ok);

  if (!ok) return res.json({ msg: "Incorrecto" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secreto123",
    { expiresIn: "1d" }
  );

  res.json({ msg: "Login exitoso", token });
};

