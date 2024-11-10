const CalificacionService = require("../services/CalificacionService");

const calificacionService = new CalificacionService();

class CalificacionController {
  // Obtener todas las calificaciones
  async getAll(req, res) {
    try {
      const calificaciones = await calificacionService.findAll();
      res.status(200).json(calificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una calificación por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const calificacion = await calificacionService.findOne(id);
      if (!calificacion) {
        return res.status(404).json({ error: "Calificación no encontrada" });
      }
      res.status(200).json(calificacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva calificación
  async create(req, res) {
    try {
      const data = req.body;
      const newCalificacion = await calificacionService.create(data);
      res.status(201).json(newCalificacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una calificación existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedCalificacion = await calificacionService.update(id, data);
      res.status(200).json(updatedCalificacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una calificación
  async delete(req, res) {
    try {
      const { id } = req.params;
      await calificacionService.delete(id);
      res.status(200).json({ message: "Calificación eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CalificacionController();
