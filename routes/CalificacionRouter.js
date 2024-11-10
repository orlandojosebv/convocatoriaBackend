const express = require("express");
const router = express.Router();

const CalificacionController = require("../controllers/CalificacionController");

router
  .get("/", CalificacionController.getAll)       // Obtener todas las calificaciones
  .get("/:id", CalificacionController.getOne)    // Obtener una calificación por ID
  .post("/", CalificacionController.create)      // Crear una nueva calificación
  .put("/:id", CalificacionController.update)    // Actualizar una calificación existente
  .delete("/:id", CalificacionController.delete) // Eliminar una calificación

module.exports = router;
