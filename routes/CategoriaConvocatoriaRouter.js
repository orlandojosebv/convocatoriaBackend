const express = require("express");
const router = express.Router();
const CategoriaConvocatoriaController = require("../controllers/CategoriaConvocatoriaController");

/**
 * @swagger
 * tags:
 *   name: CategoriasConvocatorias
 *   description: API para la gestión de categorías de las convocatorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías de convocatoria
 *     tags: [CategoriasConvocatorias]
 *     responses:
 *       200:
 *         description: Lista de categorías de convocatoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria:
 *                     type: string
 *                     description: ID único de la categoría
 *                   nombre_categoria:
 *                     type: string
 *                     description: Nombre de la categoría
 *                   Rubrica:
 *                     type: array
 *                     description: Lista de rúbricas asociadas a la categoría
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_rubrica:
 *                           type: string
 *                           description: ID único de la rúbrica
 *                         nombre_rubrica:
 *                           type: string
 *                           description: Nombre de la rúbrica
 */
router.get("/", CategoriaConvocatoriaController.getAll);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría de convocatoria por ID
 *     tags: [CategoriasConvocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la categoría de convocatoria
 *     responses:
 *       200:
 *         description: Categoría de convocatoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_categoria:
 *                   type: string
 *                   description: ID único de la categoría
 *                 nombre_categoria:
 *                   type: string
 *                   description: Nombre de la categoría
 *                 Rubrica:
 *                   type: array
 *                   description: Lista de rúbricas asociadas a la categoría
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_rubrica:
 *                         type: string
 *                         description: ID único de la rúbrica
 *                       nombre_rubrica:
 *                         type: string
 *                         description: Nombre de la rúbrica
 *       404:
 *         description: Categoría de convocatoria no encontrada
 */
router.get("/:id", CategoriaConvocatoriaController.getOne);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría de convocatoria
 *     tags: [CategoriasConvocatorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 description: Nombre de la categoría de convocatoria
 *                 example: "Investigación"
 *               id_convocatoria:
 *                 type: string
 *                 description: ID de la convocatoria asociada
 *                 example: "uuid-convocatoria"
 *     responses:
 *       201:
 *         description: Categoría de convocatoria creada exitosamente
 *       400:
 *         description: Error al crear la categoría de convocatoria
 */
router.post("/", CategoriaConvocatoriaController.create);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría de convocatoria existente
 *     tags: [CategoriasConvocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la categoría de convocatoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 description: Nombre actualizado de la categoría
 *                 example: "Innovación"
 *               id_convocatoria:
 *                 type: string
 *                 description: ID de la convocatoria asociada
 *     responses:
 *       200:
 *         description: Categoría de convocatoria actualizada exitosamente
 *       400:
 *         description: Error al actualizar la categoría de convocatoria
 */
router.put("/:id", CategoriaConvocatoriaController.update);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría de convocatoria
 *     tags: [CategoriasConvocatorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la categoría de convocatoria
 *     responses:
 *       200:
 *         description: Categoría de convocatoria eliminada exitosamente
 *       404:
 *         description: Categoría de convocatoria no encontrada
 */
router.delete("/:id", CategoriaConvocatoriaController.delete);

module.exports = router;
