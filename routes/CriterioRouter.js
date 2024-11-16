const express = require("express");
const router = express.Router();
const CriterioController = require("../controllers/CriterioController");

/**
 * @swagger
 * tags:
 *   name: Criterios
 *   description: API para la gestión de criterios
 */

/**
 * @swagger
 * /criterios:
 *   get:
 *     summary: Obtener todos los criterios
 *     tags: [Criterios]
 *     responses:
 *       200:
 *         description: Lista de criterios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_criterio:
 *                     type: string
 *                     description: ID único del criterio
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del criterio
 *                   valor_criterio:
 *                     type: number
 *                     description: Valor asignado al criterio
 *                   Rubrica:
 *                     type: object
 *                     properties:
 *                       nombre_rubrica:
 *                         type: string
 *                         description: Nombre de la rúbrica asociada
 *                   Calificaciones:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_calificacion:
 *                           type: string
 *                           description: ID de la calificación asociada
 *                         puntaje_asignado:
 *                           type: number
 *                           description: Puntaje asignado al criterio
 *                         puntaje_final:
 *                           type: number
 *                           description: Puntaje final de la calificación
 *                         observacion:
 *                           type: string
 *                           description: Observación de la calificación
 */
router.get("/", CriterioController.getAll);

/**
 * @swagger
 * /criterios/{id}:
 *   get:
 *     summary: Obtener un criterio por ID
 *     tags: [Criterios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del criterio
 *     responses:
 *       200:
 *         description: Criterio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_criterio:
 *                   type: string
 *                   description: ID único del criterio
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del criterio
 *                 valor_criterio:
 *                   type: number
 *                   description: Valor asignado al criterio
 *                 Rubrica:
 *                   type: object
 *                   properties:
 *                     nombre_rubrica:
 *                       type: string
 *                       description: Nombre de la rúbrica asociada
 *                 Calificaciones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_calificacion:
 *                         type: string
 *                         description: ID de la calificación asociada
 *                       puntaje_asignado:
 *                         type: number
 *                         description: Puntaje asignado al criterio
 *                       puntaje_final:
 *                         type: number
 *                         description: Puntaje final de la calificación
 *                       observacion:
 *                         type: string
 *                         description: Observación de la calificación
 *       404:
 *         description: Criterio no encontrado
 */
router.get("/:id", CriterioController.getOne);

/**
 * @swagger
 * /criterios:
 *   post:
 *     summary: Crear un nuevo criterio
 *     tags: [Criterios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: Descripción del criterio
 *                 example: "Calidad del proyecto"
 *               valor_criterio:
 *                 type: number
 *                 description: Valor asignado al criterio
 *                 example: 20
 *               id_rubrica:
 *                 type: string
 *                 description: ID de la rúbrica asociada
 *     responses:
 *       201:
 *         description: Criterio creado exitosamente
 *       400:
 *         description: Error al crear el criterio
 */
router.post("/", CriterioController.create);

/**
 * @swagger
 * /criterios/{id}:
 *   put:
 *     summary: Actualizar un criterio existente
 *     tags: [Criterios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del criterio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del criterio
 *               valor_criterio:
 *                 type: number
 *                 description: Nuevo valor asignado al criterio
 *               id_rubrica:
 *                 type: string
 *                 description: ID de la rúbrica asociada
 *     responses:
 *       200:
 *         description: Criterio actualizado exitosamente
 *       400:
 *         description: Error al actualizar el criterio
 */
router.put("/:id", CriterioController.update);

/**
 * @swagger
 * /criterios/{id}:
 *   delete:
 *     summary: Eliminar un criterio
 *     tags: [Criterios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único del criterio
 *     responses:
 *       200:
 *         description: Criterio eliminado exitosamente
 *       404:
 *         description: Criterio no encontrado
 */
router.delete("/:id", CriterioController.delete);

module.exports = router;
