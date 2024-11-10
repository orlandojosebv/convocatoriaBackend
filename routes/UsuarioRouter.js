const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

router
  .get("/", UsuarioController.getAll)       // Obtener todos los usuarios
  .get("/:id", UsuarioController.getOne)    // Obtener un usuario por ID
  .post("/", UsuarioController.create)      // Crear un nuevo usuario
  .put("/:id", UsuarioController.update)    // Actualizar un usuario existente
  .delete("/:id", UsuarioController.delete) // Eliminar un usuario

module.exports = router;
