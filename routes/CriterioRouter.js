const express = require("express");
const router = express.Router();

const CriterioController = require("../controllers/CriterioController");

router
  .get("/", CriterioController.getAll)       // Obtener todos los criterios
  .get("/:id", CriterioController.getOne)    // Obtener un criterio por ID
  .post("/", CriterioController.create)      // Crear un nuevo criterio
  .put("/:id", CriterioController.update)    // Actualizar un criterio existente
  .delete("/:id", CriterioController.delete) // Eliminar un criterio

module.exports = router;
