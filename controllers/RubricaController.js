const RubricaService = require("../services/RubricaService");

const rubricaService = new RubricaService();

class RubricaController {
  // Obtener todas las rúbricas
  async getAll(req, res) {
    try {
      const rubricas = await rubricaService.findAll();
      res.status(200).json(rubricas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una rúbrica por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const rubrica = await rubricaService.findOne(id);
      if (!rubrica) {
        return res.status(404).json({ error: "Rúbrica no encontrada" });
      }
      res.status(200).json(rubrica);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva rúbrica
  async create(req, res) {
    try {
      const data = req.body;
      const newRubrica = await rubricaService.create(data);
      res.status(201).json(newRubrica);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una rúbrica existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedRubrica = await rubricaService.update(id, data);
      res.status(200).json(updatedRubrica);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una rúbrica
  async delete(req, res) {
    try {
      const { id } = req.params;
      await rubricaService.delete(id);
      res.status(200).json({ message: "Rúbrica eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RubricaController();
