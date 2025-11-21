import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

await mongoose.connect("mongodb://127.0.0.1:27017/quijada");

const run = async () => {
  const hash = await bcrypt.hash("123456", 10);

  await User.create({
    email: "admin@quijada.com",
    password: hash,
    role: "admin"
  });

  console.log("ADMIN CREADO OK");
  process.exit();
};

run();
