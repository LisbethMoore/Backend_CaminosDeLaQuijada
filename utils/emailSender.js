import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lismoore28@gmail.com",
    //Contraseña de mi aplicación en Google
    pass: "uhqw xdsk csfi paet",
  },
});

export const enviarCorreo = async (to, subject, html) => {
  await transporter.sendMail({
    from: '"Los Caminos de la Quijada" <lismoore28@gmail.com>',
    to,
    subject,
    html,
  });
};
