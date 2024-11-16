const express = require("express");
const router = express.Router();
const RolController = require("../controllers/RolController");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para la gestión de roles y asignación de permisos
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_rol:
 *                     type: string
 *                     description: ID único del rol
 *                   nombre_rol:
 *                     type: string
 *                     description: Nombre del rol
 *                   Permisos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_permiso:
 *                           type: string
 *                           description: ID del permiso asociado
 *                         nombre_permiso:
 *                           type: string
 *                           description: Nombre del permiso asociado
 */
router.get("/", RolController.getAll);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 */
router.get("/:id", RolController.getOne);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_rol:
 *                 type: string
 *                 description: ID único del rol (opcional, generado automáticamente si no se incluye)
 *               nombre_rol:
 *                 type: string
 *                 description: Nombre del rol
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: IDs de permisos asociados
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error al crear el rol
 */
router.post("/", RolController.create);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Actualizar un rol existente
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *                 description: Nombre del rol
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: IDs de permisos asociados
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Error al actualizar el rol
 */
router.put("/:id", RolController.update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 */
router.delete("/:id", RolController.delete);

/**
 * @swagger
 * /roles/{id}/permissions:
 *   post:
 *     summary: Asignar permisos a un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: IDs de permisos a asignar
 *     responses:
 *       200:
 *         description: Permisos asignados exitosamente
 *       400:
 *         description: Error al asignar permisos
 */
router.post("/:id/permissions", RolController.assignPermissions);

module.exports = router;
