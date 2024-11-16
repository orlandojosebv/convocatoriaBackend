const express = require("express");
const router = express.Router();
const permisoController = require("../controllers/PermisoController");

/**
 * @swagger
 * tags:
 *   name: Permisos
 *   description: Endpoints para la gestión de permisos
 */

/**
 * @swagger
 * /permisos:
 *   get:
 *     summary: Obtener todos los permisos
 *     tags: [Permisos]
 *     responses:
 *       200:
 *         description: Lista de permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_permiso:
 *                     type: string
 *                     description: ID único del permiso
 *                   nombre_permiso:
 *                     type: string
 *                     description: Nombre del permiso
 *                   Rols:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_rol:
 *                           type: string
 *                           description: ID del rol asociado
 *                         nombre_rol:
 *                           type: string
 *                           description: Nombre del rol asociado
 */
router.get("/", permisoController.getAll);

/**
 * @swagger
 * /permisos/{id}:
 *   get:
 *     summary: Obtener un permiso por ID
 *     tags: [Permisos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del permiso
 *     responses:
 *       200:
 *         description: Permiso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_permiso:
 *                   type: string
 *                   description: ID único del permiso
 *                 nombre_permiso:
 *                   type: string
 *                   description: Nombre del permiso
 *                 Rols:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_rol:
 *                         type: string
 *                         description: ID del rol asociado
 *                       nombre_rol:
 *                         type: string
 *                         description: Nombre del rol asociado
 *       404:
 *         description: Permiso no encontrado
 */
router.get("/:id", permisoController.getOne);

/**
 * @swagger
 * /permisos:
 *   post:
 *     summary: Crear un nuevo permiso
 *     tags: [Permisos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_permiso:
 *                 type: string
 *                 description: Nombre del permiso
 *     responses:
 *       201:
 *         description: Permiso creado exitosamente
 *       400:
 *         description: Error al crear el permiso
 */
router.post("/", permisoController.create);

/**
 * @swagger
 * /permisos/{id}:
 *   put:
 *     summary: Actualizar un permiso existente
 *     tags: [Permisos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del permiso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_permiso:
 *                 type: string
 *                 description: Nombre del permiso
 *     responses:
 *       200:
 *         description: Permiso actualizado exitosamente
 *       400:
 *         description: Error al actualizar el permiso
 */
router.put("/:id", permisoController.update);

/**
 * @swagger
 * /permisos/{id}:
 *   delete:
 *     summary: Eliminar un permiso
 *     tags: [Permisos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del permiso
 *     responses:
 *       200:
 *         description: Permiso eliminado exitosamente
 *       404:
 *         description: Permiso no encontrado
 */
router.delete("/:id", permisoController.delete);

module.exports = router;
