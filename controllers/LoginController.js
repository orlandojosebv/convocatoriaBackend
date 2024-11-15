const UsuarioService = require("../services/UsuarioService");
const TokenService = require("../services/TokenService");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { SECRET_KEY, URL_FRONT } = require("../config");
const { sendEmail } = require("../utils/sendEmail");
const service = new UsuarioService();
const tokenService = new TokenService();

const login = (req, res) => {
    try {
        const usuario = req.body.correo.split("@")[0] ?? null;
        const contrasena = req.body.contrasena;

        if (!usuario || !contrasena) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const correo = req.body.correo;
        return service.findOneByEmailWithPassword(correo).then((user) => {
            if (!user || user.estado === 0) { //Si estado es 0 no esta verificado, si es 1 esta verificado y si es 2 esta desactivado
                res.status(500).json({ success: false, message: "Usuario no existe" });
            } else {
                bcrypt.compare(contrasena, user.contrasena, function (err, resp) {
                    if (err) {
                        return res.status(401).json({ message: "Usuario o contraseña incorrecta" });
                    }
                    if (resp) {
                        const id_usuario = user.id_usuario;
                        const token = jwt.sign({ id_usuario }, SECRET_KEY, { expiresIn: "1h" });
                        user.contrasena = "";
                        return res.json({ success: true, token: token, data: user });
                    } else {
                        return res.status(401).json({ message: "Usuario o contraseña incorrecta" });
                    }
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "No autenticado" });
    }
};

const me = async (req, res) => {
    try {
        res.status(200).json({ correo: req.id_usuario });   
    } catch (error) {
        res.status(500).json({ success: false, message: "No autenticado" });
    }
};

const solicitarToken = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const user = await service.findOne(id_usuario);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        const fechaExpiracion = Date.now() + 3600000; // 1 hora
        const tokenObj = await tokenService.create({ id_usuario: id_usuario, token: token, fechaExpiracion: fechaExpiracion });
        user.addToken(tokenObj);

        const enlace = `${URL_FRONT}/ReestablecerContrasena?token=${token}`
        const mensaje = `
        Hola, Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si realizaste esta solicitud, haz clic en el siguiente enlace para restablecer tu contraseña: 
                        
        ${enlace}, recuerda solo tienes 1 hora para hacer el cambio.
                        
        Si no solicitaste un restablecimiento de contraseña, por favor ignora este correo. Tu contraseña actual permanecerá sin cambios y no es necesario que realices ninguna acción adicional.`

        await sendEmail({
            destination: user.correo,
            subject: "Cambio de contraseña",
            text: mensaje
        })

        res.status(200).json({ succes: true, message: 'Correo de restablecimiento de contraseña enviado' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const verificarToken = async (req, res) => {
    const { token } = req.params;
    try {
        const valido = await tokenService.findValids(token);
        if (valido === null || valido === undefined) {
            throw new Error("Token no existe o ya expiró");
        }
        res.status(200).json({ succes: true, token: token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const cambiarContrasena = async (req, res) => {
    try {
        const { token } = req.params;

        if (!req.body.contrasena) {
            throw new Error("Debe indicar una contraseña");
        }

        const valido = await tokenService.findValids(token);

        if (valido === null || valido === undefined) {
            throw new Error("Token no existe o ya expiró");
        }

        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
        const data = await service.update(valido.id_usuario, req.body);
        await tokenService.delete(valido.id);
        res.status(200).json({ success: true, message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    login,
    me,
    solicitarToken,
    verificarToken,
    cambiarContrasena
}