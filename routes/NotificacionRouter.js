const express = require("express");
const router = express.Router();
const NotificacionController = require("../controllers/NotificacionController");

/**
 * @swagger
 * tags:
 *   name: Notificaciones
 *   description: Endpoints para la gestión de notificaciones
 */

/**
 * @swagger
 * /notificaciones:
 *   get:
 *     summary: Obtener todas las notificaciones
 *     tags: [Notificaciones]
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_notificacion:
 *                     type: string
 *                     description: ID único de la notificación
 *                   mensaje:
 *                     type: string
 *                     description: Contenido del mensaje
 *                   fecha_envio:
 *                     type: string
 *                     description: Fecha de envío de la notificación
 *                   Usuario:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: string
 *                         description: ID del usuario asociado
 *                       correo:
 *                         type: string
 *                         description: Correo del usuario asociado
 */
router.get("/", NotificacionController.getAll);

/**
 * @swagger
 * /notificaciones/{id}:
 *   get:
 *     summary: Obtener una notificación por ID
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la notificación
 *     responses:
 *       200:
 *         description: Notificación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_notificacion:
 *                   type: string
 *                   description: ID único de la notificación
 *                 mensaje:
 *                   type: string
 *                   description: Contenido del mensaje
 *                 fecha_envio:
 *                   type: string
 *                   description: Fecha de envío de la notificación
 *                 Usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: string
 *                       description: ID del usuario asociado
 *                     correo:
 *                       type: string
 *                       description: Correo del usuario asociado
 *       404:
 *         description: Notificación no encontrada
 */
router.get("/:id", NotificacionController.getOne);

/**
 * @swagger
 * /notificaciones:
 *   post:
 *     summary: Crear una nueva notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *                 description: Contenido del mensaje
 *               fecha_envio:
 *                 type: string
 *                 description: Fecha de envío de la notificación
 *               id_usuario:
 *                 type: string
 *                 description: ID del usuario al que se envía la notificación
 *     responses:
 *       201:
 *         description: Notificación creada exitosamente
 *       400:
 *         description: Error al crear la notificación
 */
router.post("/", NotificacionController.create);

/**
 * @swagger
 * /notificaciones/{id}:
 *   put:
 *     summary: Actualizar una notificación existente
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la notificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *                 description: Contenido del mensaje
 *               fecha_envio:
 *                 type: string
 *                 description: Fecha de envío de la notificación
 *     responses:
 *       200:
 *         description: Notificación actualizada exitosamente
 *       400:
 *         description: Error al actualizar la notificación
 */
router.put("/:id", NotificacionController.update);

/**
 * @swagger
 * /notificaciones/{id}:
 *   delete:
 *     summary: Eliminar una notificación
 *     tags: [Notificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la notificación
 *     responses:
 *       200:
 *         description: Notificación eliminada exitosamente
 *       404:
 *         description: Notificación no encontrada
 */
router.delete("/:id", NotificacionController.delete);

module.exports = router;
