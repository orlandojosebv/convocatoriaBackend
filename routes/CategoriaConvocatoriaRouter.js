// CategoriaConvocatoriaRouter.js
const express = require("express");
const router = express.Router();
const CategoriaConvocatoriaController = require("../controllers/CategoriaConvocatoriaController");

router
  .get("/", CategoriaConvocatoriaController.getAll)       // Obtener todas las categorías de convocatoria
  .get("/:id", CategoriaConvocatoriaController.getOne)    // Obtener una categoría de convocatoria por ID
  .post("/", CategoriaConvocatoriaController.create)      // Crear una nueva categoría de convocatoria
  .put("/:id", CategoriaConvocatoriaController.update)    // Actualizar una categoría de convocatoria existente
  .delete("/:id", CategoriaConvocatoriaController.delete); // Eliminar una categoría de convocatoria

module.exports = router;
