const UsuarioService = require("../services/UsuarioService");
const TokenService = require("../services/TokenService");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { SECRET_KEY, URL_FRONT } = require("../config");
const { sendEmail } = require("../utils/sendEmail");
const service = new UsuarioService();
const tokenService = new TokenService();
const rolService = new RolService();

const register = async (req, res) => {
    try {
        const usuario = req.body.correo?.split("@")[0];
        if (!usuario) {
            return res.status(400).json({ message: "Correo es requerido" });
        }

        const correo = req.body.correo;
        const posibleUsuario = await service.findOneByEmailWithPassword(correo);

        if (posibleUsuario?.estado) {
            throw new Error("Ya existe un usuario con ese correo");
        }

        if (posibleUsuario) {
            await service.delete(posibleUsuario.id_usuario);
        }

        const contrasena = req.body.contrasena;
        req.body.contrasena = bcrypt.hashSync(contrasena, 10);

        const data = await service.createDefault(req.body);

        const token = crypto.randomBytes(20).toString('hex');
        const fechaExpiracion = Date.now() + 3600000; // 1 hora
        const id_usuario = data.id_usuario;
        const tokenObj = await tokenService.create({ id_usuario, correo, token, fechaExpiracion });
        const id_rol = req.body.id_rol;
        const rolObj = await rolService.findOne(id_rol);
        await data.addToken(tokenObj);
        if (rolObj) await data.addRol(rolObj);

        const urlConfirmar = `${URL_FRONT}/ConfirmarRegistro?token=${token}`;

        await sendEmail({
            destination: data.correo,
            subject: "Confirma tu correo",
            text: `Hola ${data.nombre} ${data.apellido}, te damos la bienvenida a Lula Crochet. Por favor confirma tu correo haciendo click en el siguiente enlace: 
            ${urlConfirmar} .
            
            Recuerda que tienes un 1 hora para confirmar tu correo.`
        });

        return res.json({ success: true, data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    try {
        const valido = await tokenService.findValids(token);
        if (valido === null || valido === undefined) {
            throw new Error("Token no existe o ya expiró");
        }
        const data = await service.activarUsuario(valido.id_usuario);
        await sendEmail({
            destination: data.correo,
            subject: "Bienvenido a nuestro aplicativo",
            text: `Acabamos de confirmar tu registro. Inicia sesión en el siguiente enlace: ${URL_FRONT}/LoginRegistro`
        });
        res.status(200).json({ succes: true, token: token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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
                        const token = jwt.sign({ id_usuario, correo }, SECRET_KEY, { expiresIn: "1h" });
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
        const tokenObj = await tokenService.create({ id_usuario: id_usuario, token: token, fechaExpiracion: fechaExpiracion, correo: correo });
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
    register,
    confirmarCuenta,
    login,
    me,
    solicitarToken,
    verificarToken,
    cambiarContrasena
}