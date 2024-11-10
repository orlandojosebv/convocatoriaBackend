const express = require("express");
const router = express.Router();

const RubricaController = require("../controllers/RubricaController");

router
  .get("/", RubricaController.getAll)       // Obtener todas las rúbricas
  .get("/:id", RubricaController.getOne)    // Obtener una rúbrica por ID
  .post("/", RubricaController.create)      // Crear una nueva rúbrica
  .put("/:id", RubricaController.update)    // Actualizar una rúbrica existente
  .delete("/:id", RubricaController.delete) // Eliminar una rúbrica

module.exports = router;
