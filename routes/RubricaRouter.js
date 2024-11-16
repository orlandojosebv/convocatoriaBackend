const express = require("express");
const router = express.Router();
const RubricaController = require("../controllers/RubricaController");

/**
 * @swagger
 * tags:
 *   name: Rubricas
 *   description: Endpoints para la gestión de rúbricas
 */

/**
 * @swagger
 * /rubricas:
 *   get:
 *     summary: Obtener todas las rúbricas
 *     tags: [Rubricas]
 *     responses:
 *       200:
 *         description: Lista de rúbricas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_rubrica:
 *                     type: string
 *                     description: ID único de la rúbrica
 *                   nombre_rubrica:
 *                     type: string
 *                     description: Nombre de la rúbrica
 *                   id_categoria:
 *                     type: string
 *                     description: ID de la categoría asociada
 *                   CategoriaConvocatoria:
 *                     type: object
 *                     properties:
 *                       nombre_categoria:
 *                         type: string
 *                         description: Nombre de la categoría asociada
 *                   Criterios:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_criterio:
 *                           type: string
 *                           description: ID único del criterio
 *                         descripcion:
 *                           type: string
 *                           description: Descripción del criterio
 */
router.get("/", RubricaController.getAll);

/**
 * @swagger
 * /rubricas/{id}:
 *   get:
 *     summary: Obtener una rúbrica por ID
 *     tags: [Rubricas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la rúbrica
 *     responses:
 *       200:
 *         description: Rúbrica encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_rubrica:
 *                   type: string
 *                   description: ID único de la rúbrica
 *                 nombre_rubrica:
 *                   type: string
 *                   description: Nombre de la rúbrica
 *                 id_categoria:
 *                   type: string
 *                   description: ID de la categoría asociada
 *                 CategoriaConvocatoria:
 *                   type: object
 *                   properties:
 *                     nombre_categoria:
 *                       type: string
 *                       description: Nombre de la categoría asociada
 *                 Criterios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_criterio:
 *                         type: string
 *                         description: ID único del criterio
 *                       descripcion:
 *                         type: string
 *                         description: Descripción del criterio
 *       404:
 *         description: Rúbrica no encontrada
 */
router.get("/:id", RubricaController.getOne);

/**
 * @swagger
 * /rubricas:
 *   post:
 *     summary: Crear una nueva rúbrica
 *     tags: [Rubricas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rubrica:
 *                 type: string
 *                 description: Nombre de la rúbrica
 *               id_categoria:
 *                 type: string
 *                 description: ID de la categoría asociada
 *     responses:
 *       201:
 *         description: Rúbrica creada exitosamente
 *       400:
 *         description: Error al crear la rúbrica
 */
router.post("/", RubricaController.create);

/**
 * @swagger
 * /rubricas/{id}:
 *   put:
 *     summary: Actualizar una rúbrica existente
 *     tags: [Rubricas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la rúbrica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rubrica:
 *                 type: string
 *                 description: Nombre de la rúbrica
 *               id_categoria:
 *                 type: string
 *                 description: ID de la categoría asociada
 *     responses:
 *       200:
 *         description: Rúbrica actualizada exitosamente
 *       400:
 *         description: Error al actualizar la rúbrica
 */
router.put("/:id", RubricaController.update);

/**
 * @swagger
 * /rubricas/{id}:
 *   delete:
 *     summary: Eliminar una rúbrica
 *     tags: [Rubricas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la rúbrica
 *     responses:
 *       200:
 *         description: Rúbrica eliminada exitosamente
 *       404:
 *         description: Rúbrica no encontrada
 */
router.delete("/:id", RubricaController.delete);

module.exports = router;
