const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados con la autenticación y recuperación de contraseñas
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       500:
 *         description: Error en el registro del usuario
 */
router.post("/register", loginController.register);

/**
 * @swagger
 * /auth/confirmar/{token}:
 *   post:
 *     summary: Confirmar una cuenta mediante un token
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de confirmación
 *     responses:
 *       200:
 *         description: Cuenta confirmada exitosamente
 *       500:
 *         description: Token no válido o ya expiró
 */
router.post("/confirmar/:token", loginController.confirmarCuenta);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *       401:
 *         description: Token no proporcionado
 *       403:
 *         description: Token no válido
 */
router.get("/me", verifyToken, loginController.me);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Sesión iniciada exitosamente
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post("/login", loginController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar un token para restablecer contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: string
 *                 description: ID del usuario
 *     responses:
 *       200:
 *         description: Token enviado al correo del usuario
 *       400:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al enviar el token
 */
router.post("/forgot-password", loginController.solicitarToken);

/**
 * @swagger
 * /auth/reset/{token}:
 *   get:
 *     summary: Verificar un token para restablecer contraseña
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de restablecimiento
 *     responses:
 *       200:
 *         description: Token válido
 *       500:
 *         description: Token no válido o ya expiró
 */
router.get("/reset/:token", loginController.verificarToken);

/**
 * @swagger
 * /auth/reset/{token}:
 *   post:
 *     summary: Restablecer contraseña utilizando un token
 *     tags: [Autenticación]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de restablecimiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrasena:
 *                 type: string
 *                 description: Nueva contraseña
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       500:
 *         description: Error al restablecer la contraseña
 */
router.post("/reset/:token", loginController.cambiarContrasena);

module.exports = router;
