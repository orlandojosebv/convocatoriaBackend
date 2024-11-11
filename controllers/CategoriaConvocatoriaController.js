// CategoriaConvocatoriaController.js
const CategoriaConvocatoriaService = require("../services/CategoriaConvocatoriaService");
const categoriaConvocatoriaService = new CategoriaConvocatoriaService();

class CategoriaConvocatoriaController {
  // Obtener todas las categorías de convocatoria
  async getAll(req, res) {
    try {
      const categorias = await categoriaConvocatoriaService.findAll();
      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una categoría de convocatoria por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const categoria = await categoriaConvocatoriaService.findOne(id);
      if (!categoria) {
        return res.status(404).json({ error: "CategoriaConvocatoria no encontrada" });
      }
      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva categoría de convocatoria
  async create(req, res) {
    try {
      const data = req.body;
      const newCategoria = await categoriaConvocatoriaService.create(data);
      res.status(201).json(newCategoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una categoría de convocatoria existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedCategoria = await categoriaConvocatoriaService.update(id, data);
      res.status(200).json(updatedCategoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una categoría de convocatoria
  async delete(req, res) {
    try {
      const { id } = req.params;
      await categoriaConvocatoriaService.delete(id);
      res.status(200).json({ message: "CategoriaConvocatoria eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoriaConvocatoriaController();
