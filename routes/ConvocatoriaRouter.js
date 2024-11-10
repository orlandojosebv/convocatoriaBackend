const express = require("express");
const router = express.Router();

const ConvocatoriaController = require("../controllers/ConvocatoriaController");

router
  .get("/", ConvocatoriaController.getAll)       // Obtener todas las convocatorias
  .get("/:id", ConvocatoriaController.getOne)    // Obtener una convocatoria por ID
  .post("/", ConvocatoriaController.create)      // Crear una nueva convocatoria
  .put("/:id", ConvocatoriaController.update)    // Actualizar una convocatoria existente
  .delete("/:id", ConvocatoriaController.delete) // Eliminar una convocatoria

module.exports = router;
