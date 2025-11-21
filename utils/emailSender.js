import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "//CORREO",
    //Contraseña de mi aplicación en Google
    pass: "//CONTRASEÑA",
  },
});

export const enviarCorreo = async (to, subject, html) => {
  await transporter.sendMail({
    from: '"Los Caminos de la Quijada" //CORREO>',
    to,
    subject,
    html,
  });
};
