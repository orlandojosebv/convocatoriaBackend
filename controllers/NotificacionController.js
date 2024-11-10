const NotificacionService = require("../services/NotificacionService");

const notificacionService = new NotificacionService();

class NotificacionController {
  // Obtener todas las notificaciones
  async getAll(req, res) {
    try {
      const notificaciones = await notificacionService.findAll();
      res.status(200).json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una notificación por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const notificacion = await notificacionService.findOne(id);
      if (!notificacion) {
        return res.status(404).json({ error: "Notificación no encontrada" });
      }
      res.status(200).json(notificacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva notificación
  async create(req, res) {
    try {
      const data = req.body;
      const newNotificacion = await notificacionService.create(data);
      res.status(201).json(newNotificacion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una notificación existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedNotificacion = await notificacionService.update(id, data);
      res.status(200).json(updatedNotificacion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una notificación
  async delete(req, res) {
    try {
      const { id } = req.params;
      await notificacionService.delete(id);
      res.status(200).json({ message: "Notificación eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NotificacionController();
