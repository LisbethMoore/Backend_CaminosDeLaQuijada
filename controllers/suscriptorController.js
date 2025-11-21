import Suscriptor from "../models/Suscriptor.js";
import { enviarCorreo } from "../utils/emailSender.js";

export const agregarSuscriptor = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) 
            return res.status(400).json({ status: "error", msg: "Email requerido" });

        const existente = await Suscriptor.findOne({ email });

        if (existente) {
            // Si ya está registrado, NO enviamos correo otra vez
            return res.json({
                status: "exists",
                msg: "Este correo ya estaba registrado"
            });
        }

        // Guardar suscriptor nuevo
        const nuevo = new Suscriptor({ email });
        await nuevo.save();

        // 📩 ENVIAR CORREO DE BIENVENIDA
        await enviarCorreo(
            email,
            "¡Gracias por unirte al viaje!",
            `
                <h2 style="color:#8B4513;">¡Bienvenido, viajero!</h2>
                <p>Gracias por unirte a <strong>Los Caminos de la Quijada</strong>.</p>
                <p>Te avisaremos en cuanto el juego esté listo para descarga.</p>
                <br/>
                <p>Mientras tanto, prepárate para la aventura...</p>
            `
        );

        return res.json({
            status: "ok",
            msg: "Correo registrado con éxito"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", msg: "Error en el servidor" });
    }
};

export const enviarLanzamiento = async (req, res) => {
    try {
        const suscriptores = await Suscriptor.find();

        for (const user of suscriptores) {
            await enviarCorreo(
                user.email,
                " ¡El juego ya está disponible!",
                `
        <h2>Los Caminos de la Quijada</h2>
        <p>¡El juego ya está disponible para descargar!</p>
        <p>Ingresa ahora y vive la aventura:</p>
        <p>Descargar ahora</p>
      `
            );
        }

        res.json({ msg: "Correos enviados correctamente" });
    } catch (err) {
        res.status(500).json({ msg: "Error enviando correos" });
    }
};
export const obtenerSuscriptores = async (req, res) => {
    const lista = await Suscriptor.find().sort({ fecha: -1 });
    res.json(lista);
};
