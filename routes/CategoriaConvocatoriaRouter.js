// CategoriaConvocatoriaRouter.js
const express = require("express");
const router = express.Router();
const CategoriaConvocatoriaController = require("../controllers/CategoriaConvocatoriaController");

router
  .get("/", CategoriaConvocatoriaController.getAll)     
  .get("/:id", CategoriaConvocatoriaController.getOne)  
  .post("/", CategoriaConvocatoriaController.create) 
  .put("/:id", CategoriaConvocatoriaController.update)    
  .delete("/:id", CategoriaConvocatoriaController.delete);

module.exports = router;
