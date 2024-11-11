const express = require("express");
const router = express.Router();

const RolController = require("../controllers/RolController");

router
  .get("/", RolController.getAll)       // Obtener todos los roles
  .get("/:id", RolController.getOne)    // Obtener un rol por ID
  .post("/", RolController.create)      // Crear un nuevo rol
  .post("/:id/permisos", RolController.assignPermissions) //Asignar permiso a un rol en especifico
  .put("/:id", RolController.update)    // Actualizar un rol existente
  .delete("/:id", RolController.delete) // Eliminar un rol

module.exports = router;
