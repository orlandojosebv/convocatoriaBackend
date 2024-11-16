const express = require("express");
const router = express.Router();
const ProyectoController = require("../controllers/ProyectoController");

/**
 * @swagger
 * tags:
 *   name: Proyectos
 *   description: Endpoints para la gestión de proyectos
 */

/**
 * @swagger
 * /proyectos:
 *   get:
 *     summary: Obtener todos los proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_proyecto:
 *                     type: string
 *                     description: ID único del proyecto
 *                   titulo:
 *                     type: string
 *                     description: Título del proyecto
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del proyecto
 *                   estado:
 *                     type: string
 *                     description: Estado actual del proyecto
 *                   fecha_inscripcion:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de inscripción del proyecto
 *                   calificacion_final:
 *                     type: number
 *                     format: decimal
 *                     description: Calificación final del proyecto
 *                   docente_asignado:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: string
 *                         description: ID del docente asignado
 *                       nombre:
 *                         type: string
 *                         description: Nombre del docente
 *                       apellido:
 *                         type: string
 *                         description: Apellido del docente
 *                       correo:
 *                         type: string
 *                         description: Correo del docente
 *                   integrantes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id_usuario:
 *                           type: string
 *                           description: ID del integrante
 *                         nombre:
 *                           type: string
 *                           description: Nombre del integrante
 *                         apellido:
 *                           type: string
 *                           description: Apellido del integrante
 *                         correo:
 *                           type: string
 *                           description: Correo del integrante
 *                   CategoriaConvocatorium:
 *                     type: object
 *                     properties:
 *                       id_categoria:
 *                         type: string
 *                         description: ID de la categoría
 *                       nombre_categoria:
 *                         type: string
 *                         description: Nombre de la categoría
 */
router.get("/", ProyectoController.getAll);

/**
 * @swagger
 * /proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyecto'
 *       404:
 *         description: Proyecto no encontrado
 */
router.get("/:id", ProyectoController.getOne);

/**
 * @swagger
 * /proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del proyecto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del proyecto
 *               estado:
 *                 type: string
 *                 description: Estado actual del proyecto
 *               fecha_inscripcion:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inscripción del proyecto
 *               calificacion_final:
 *                 type: number
 *                 format: decimal
 *                 description: Calificación final del proyecto
 *               id_categoria:
 *                 type: string
 *                 description: ID de la categoría del proyecto
 *               id_usuario:
 *                 type: string
 *                 description: ID del docente asignado
 *               integrantes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID de los integrantes
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *       400:
 *         description: Error al crear el proyecto
 */
router.post("/", ProyectoController.create);

/**
 * @swagger
 * /proyectos/{id}:
 *   put:
 *     summary: Actualizar un proyecto existente
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título del proyecto
 *               descripcion:
 *                 type: string
 *                 description: Descripción del proyecto
 *               estado:
 *                 type: string
 *                 description: Estado actual del proyecto
 *               fecha_inscripcion:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inscripción del proyecto
 *               calificacion_final:
 *                 type: number
 *                 format: decimal
 *                 description: Calificación final del proyecto
 *               id_categoria:
 *                 type: string
 *                 description: ID de la categoría del proyecto
 *               id_usuario:
 *                 type: string
 *                 description: ID del docente asignado
 *               integrantes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID de los integrantes
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *       400:
 *         description: Error al actualizar el proyecto
 */
router.put("/:id", ProyectoController.update);

/**
 * @swagger
 * /proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente
 *       404:
 *         description: Proyecto no encontrado
 */
router.delete("/:id", ProyectoController.delete);

module.exports = router;
