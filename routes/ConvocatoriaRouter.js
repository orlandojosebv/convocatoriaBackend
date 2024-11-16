const express = require("express");
const router = express.Router();
const ConvocatoriaController = require("../controllers/ConvocatoriaController");

/**
 * @swagger
 * tags:
 *   name: Convocatorias
 *   description: API para la gestión de convocatorias
 */

/**
 * @swagger
 * /convocatorias:
 *   get:
 *     summary: Obtener todas las convocatorias
 *     tags: [Convocatorias]
 *     responses:
 *       200:
 *         description: Lista de convocatorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_convocatoria:
 *                     type: string
 *                     description: ID único de la convocatoria
 *                   nombre_convocatoria:
 *                     type: string
 *                     description: Nombre de la convocatoria
 *                   fecha_inicio_inscripcion:
 *                     type: string
 *                     format: date
 *                     description: Fecha de inicio de la inscripción
 *                   fecha_cierre_inscripcion:
 *                     type: string
 *                     format: date
 *                     description: Fecha de cierre de la inscripción
 *                   fecha_limite_calificacion:
 *                     type: string
 *                     format: date
 *                     description: Fecha límite para la calificación
 *                   fecha_inicio_convocatoria:
 *                     type: string
 *                     format: date
 *                     description: Fecha de inicio de la convocatoria
 *                   fecha_cierre_convocatoria:
 *                     type: string
 *                     format: date
 *                     description: Fecha de cierre de la convocatoria
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_categoria:
 *                           type: string
 *                           description: ID de la categoría asociada
 *                         nombre_categoria:
 *                           type: string
 *                           description: Nombre de la categoría asociada
 */
router.get("/", ConvocatoriaController.getAll);

/**
 * @swagger
 * /convocatorias/{id}:
 *   get:
 *     summary: Obtener una convocatoria por ID
 *     tags: [Convocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la convocatoria
 *     responses:
 *       200:
 *         description: Convocatoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_convocatoria:
 *                   type: string
 *                   description: ID único de la convocatoria
 *                 nombre_convocatoria:
 *                   type: string
 *                   description: Nombre de la convocatoria
 *                 fecha_inicio_inscripcion:
 *                   type: string
 *                   format: date
 *                   description: Fecha de inicio de la inscripción
 *                 fecha_cierre_inscripcion:
 *                   type: string
 *                   format: date
 *                   description: Fecha de cierre de la inscripción
 *                 fecha_limite_calificacion:
 *                   type: string
 *                   format: date
 *                   description: Fecha límite para la calificación
 *                 fecha_inicio_convocatoria:
 *                   type: string
 *                   format: date
 *                   description: Fecha de inicio de la convocatoria
 *                 fecha_cierre_convocatoria:
 *                   type: string
 *                   format: date
 *                   description: Fecha de cierre de la convocatoria
 *                 categorias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_categoria:
 *                         type: string
 *                         description: ID de la categoría asociada
 *                       nombre_categoria:
 *                         type: string
 *                         description: Nombre de la categoría asociada
 *       404:
 *         description: Convocatoria no encontrada
 */
router.get("/:id", ConvocatoriaController.getOne);

/**
 * @swagger
 * /convocatorias:
 *   post:
 *     summary: Crear una nueva convocatoria
 *     tags: [Convocatorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_convocatoria:
 *                 type: string
 *                 description: Nombre de la convocatoria
 *                 example: "Convocatoria Anual"
 *               fecha_inicio_inscripcion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de inscripción
 *               fecha_cierre_inscripcion:
 *                 type: string
 *                 format: date
 *                 description: Fecha de cierre de inscripción
 *               fecha_limite_calificacion:
 *                 type: string
 *                 format: date
 *                 description: Fecha límite para calificaciones
 *               fecha_inicio_convocatoria:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio de la convocatoria
 *               fecha_cierre_convocatoria:
 *                 type: string
 *                 format: date
 *                 description: Fecha de cierre de la convocatoria
 *               categorias:
 *                 type: array
 *                 description: IDs de las categorías asociadas
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Convocatoria creada exitosamente
 *       400:
 *         description: Error al crear la convocatoria
 */
router.post("/", ConvocatoriaController.create);

/**
 * @swagger
 * /convocatorias/{id}:
 *   put:
 *     summary: Actualizar una convocatoria existente
 *     tags: [Convocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la convocatoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_convocatoria:
 *                 type: string
 *                 description: Nombre de la convocatoria
 *               fecha_inicio_inscripcion:
 *                 type: string
 *                 format: date
 *               fecha_cierre_inscripcion:
 *                 type: string
 *                 format: date
 *               fecha_limite_calificacion:
 *                 type: string
 *                 format: date
 *               fecha_inicio_convocatoria:
 *                 type: string
 *                 format: date
 *               fecha_cierre_convocatoria:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Convocatoria actualizada exitosamente
 *       400:
 *         description: Error al actualizar la convocatoria
 */
router.put("/:id", ConvocatoriaController.update);

/**
 * @swagger
 * /convocatorias/{id}:
 *   delete:
 *     summary: Eliminar una convocatoria
 *     tags: [Convocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la convocatoria
 *     responses:
 *       200:
 *         description: Convocatoria eliminada exitosamente
 *       404:
 *         description: Convocatoria no encontrada
 */
router.delete("/:id", ConvocatoriaController.delete);

module.exports = router;
