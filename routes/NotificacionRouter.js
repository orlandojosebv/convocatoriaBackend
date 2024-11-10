const express = require("express");
const router = express.Router();

const NotificacionController = require("../controllers/NotificacionController");

router
  .get("/", NotificacionController.getAll)       // Obtener todas las notificaciones
  .get("/:id", NotificacionController.getOne)    // Obtener una notificación por ID
  .post("/", NotificacionController.create)      // Crear una nueva notificación
  .put("/:id", NotificacionController.update)    // Actualizar una notificación existente
  .delete("/:id", NotificacionController.delete) // Eliminar una notificación

module.exports = router;
