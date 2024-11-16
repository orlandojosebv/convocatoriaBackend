const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios con sus roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: string
 *                     description: ID del usuario
 *                   correo:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   estado:
 *                     type: boolean
 *                     description: Estado del usuario (activo/inactivo)
 *                   id_rol:
 *                     type: string
 *                     description: ID del rol asociado
 *                   nombre_rol:
 *                     type: string
 *                     description: Nombre del rol asociado
 */
router.get("/", UsuarioController.getAll);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: string
 *                   description: ID del usuario
 *                 correo:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 estado:
 *                   type: boolean
 *                   description: Estado del usuario
 *                 id_rol:
 *                   type: string
 *                   description: ID del rol asociado
 *                 nombre_rol:
 *                   type: string
 *                   description: Nombre del rol asociado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", UsuarioController.getOne);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: usuario@ejemplo.com
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Pérez
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: password123
 *               estado:
 *                 type: boolean
 *                 description: Estado del usuario
 *                 example: true
 *               id_rol:
 *                 type: string
 *                 description: ID del rol asociado
 *                 example: "rol_1"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error al crear el usuario
 */
router.post("/", UsuarioController.create);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: usuario@ejemplo.com
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: Pérez
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: password123
 *               estado:
 *                 type: boolean
 *                 description: Estado del usuario
 *                 example: true
 *               id_rol:
 *                 type: string
 *                 description: ID del rol asociado
 *                 example: "rol_1"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error al actualizar el usuario
 */
router.put("/:id", UsuarioController.update);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", UsuarioController.delete);

module.exports = router;
