const CriterioService = require("../services/CriterioService");

const criterioService = new CriterioService();

class CriterioController {
  // Obtener todos los criterios
  async getAll(req, res) {
    try {
      const criterios = await criterioService.findAll();
      res.status(200).json(criterios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un criterio por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const criterio = await criterioService.findOne(id);
      if (!criterio) {
        return res.status(404).json({ error: "Criterio no encontrado" });
      }
      res.status(200).json(criterio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo criterio
  async create(req, res) {
    try {
      const data = req.body;
      const newCriterio = await criterioService.create(data);
      res.status(201).json(newCriterio);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un criterio existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedCriterio = await criterioService.update(id, data);
      res.status(200).json(updatedCriterio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un criterio
  async delete(req, res) {
    try {
      const { id } = req.params;
      await criterioService.delete(id);
      res.status(200).json({ message: "Criterio eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CriterioController();
