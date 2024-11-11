const ConvocatoriaService = require("../services/ConvocatoriaService");

const convocatoriaService = new ConvocatoriaService();

class ConvocatoriaController {
  // Obtener todas las convocatorias
  async getAll(req, res) {
    try {
      const convocatorias = await convocatoriaService.findAll();
      res.status(200).json(convocatorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener una convocatoria por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const convocatoria = await convocatoriaService.findOne(id);
      if (!convocatoria) {
        return res.status(404).json({ error: "Convocatoria no encontrada" });
      }
      res.status(200).json(convocatoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear una nueva convocatoria
  async create(req, res) {
    try {
      const data = req.body;
      const newConvocatoria = await convocatoriaService.create(data);
      res.status(201).json({ message: "Convocatoria creada con éxito", newConvocatoria });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar una convocatoria existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedConvocatoria = await convocatoriaService.update(id, data);
      res.status(200).json(updatedConvocatoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar una convocatoria
  async delete(req, res) {
    try {
      const { id } = req.params;
      await convocatoriaService.delete(id);
      res.status(200).json({ message: "Convocatoria eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ConvocatoriaController();
