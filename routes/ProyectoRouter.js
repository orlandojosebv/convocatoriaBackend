const express = require("express");
const router = express.Router();

const ProyectoController = require("../controllers/ProyectoController");

router
  .get("/", ProyectoController.getAll)       // Obtener todos los proyectos
  .get("/:id", ProyectoController.getOne)    // Obtener un proyecto por ID
  .post("/", ProyectoController.create)      // Crear un nuevo proyecto
  .put("/:id", ProyectoController.update)    // Actualizar un proyecto existente
  .delete("/:id", ProyectoController.delete) // Eliminar un proyecto

module.exports = router;
