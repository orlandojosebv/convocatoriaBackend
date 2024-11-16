const express = require("express");
const router = express.Router();
const CalificacionController = require("../controllers/CalificacionController");

/**
 * @swagger
 * tags:
 *   name: Calificaciones
 *   description: API para la gestión de calificaciones
 */

/**
 * @swagger
 * /calificaciones:
 *   get:
 *     summary: Obtener todas las calificaciones
 *     tags: [Calificaciones]
 *     responses:
 *       200:
 *         description: Lista de calificaciones con sus relaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_calificacion:
 *                     type: string
 *                     description: ID único de la calificación
 *                   puntaje_final:
 *                     type: number
 *                     description: Puntaje final otorgado
 *                   observacion:
 *                     type: string
 *                     description: Observación de la calificación
 *                   id_usuario:
 *                     type: string
 *                     description: ID del usuario que realizó la calificación
 *                   id_proyecto:
 *                     type: string
 *                     description: ID del proyecto calificado
 *                   Criterios:
 *                     type: array
 *                     description: Lista de criterios evaluados
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_criterio:
 *                           type: string
 *                           description: ID del criterio
 *                         puntaje_asignado:
 *                           type: number
 *                           description: Puntaje asignado al criterio
 */
router.get("/", CalificacionController.getAll);

/**
 * @swagger
 * /calificaciones/{id}:
 *   get:
 *     summary: Obtener una calificación por ID
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la calificación
 *     responses:
 *       200:
 *         description: Calificación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_calificacion:
 *                   type: string
 *                   description: ID único de la calificación
 *                 puntaje_final:
 *                   type: number
 *                   description: Puntaje final otorgado
 *                 observacion:
 *                   type: string
 *                   description: Observación de la calificación
 *                 id_usuario:
 *                   type: string
 *                   description: ID del usuario que realizó la calificación
 *                 id_proyecto:
 *                   type: string
 *                   description: ID del proyecto calificado
 *                 Criterios:
 *                   type: array
 *                   description: Lista de criterios evaluados
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_criterio:
 *                         type: string
 *                         description: ID del criterio
 *                       puntaje_asignado:
 *                         type: number
 *                         description: Puntaje asignado al criterio
 *       404:
 *         description: Calificación no encontrada
 */
router.get("/:id", CalificacionController.getOne);

/**
 * @swagger
 * /calificaciones:
 *   post:
 *     summary: Crear una nueva calificación
 *     tags: [Calificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               puntaje_final:
 *                 type: number
 *                 description: Puntaje final otorgado
 *                 example: 9.5
 *               observacion:
 *                 type: string
 *                 description: Observación sobre la calificación
 *                 example: "Buen desempeño"
 *               id_usuario:
 *                 type: string
 *                 description: ID del usuario que realiza la calificación
 *                 example: "uuid-usuario"
 *               id_proyecto:
 *                 type: string
 *                 description: ID del proyecto calificado
 *                 example: "uuid-proyecto"
 *               criterios:
 *                 type: array
 *                 description: Lista de criterios con puntajes asignados
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_criterio:
 *                       type: string
 *                       description: ID del criterio evaluado
 *                     puntaje_asignado:
 *                       type: number
 *                       description: Puntaje asignado al criterio
 *     responses:
 *       201:
 *         description: Calificación creada exitosamente
 *       400:
 *         description: Error al crear la calificación
 */
router.post("/", CalificacionController.create);

/**
 * @swagger
 * /calificaciones/{id}:
 *   put:
 *     summary: Actualizar una calificación existente
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la calificación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               puntaje_final:
 *                 type: number
 *                 description: Puntaje final otorgado
 *               observacion:
 *                 type: string
 *                 description: Observación sobre la calificación
 *               id_usuario:
 *                 type: string
 *                 description: ID del usuario que realiza la calificación
 *               id_proyecto:
 *                 type: string
 *                 description: ID del proyecto calificado
 *     responses:
 *       200:
 *         description: Calificación actualizada exitosamente
 *       400:
 *         description: Error al actualizar la calificación
 */
router.put("/:id", CalificacionController.update);

/**
 * @swagger
 * /calificaciones/{id}:
 *   delete:
 *     summary: Eliminar una calificación
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la calificación
 *     responses:
 *       200:
 *         description: Calificación eliminada exitosamente
 *       404:
 *         description: Calificación no encontrada
 */
router.delete("/:id", CalificacionController.delete);

module.exports = router;
