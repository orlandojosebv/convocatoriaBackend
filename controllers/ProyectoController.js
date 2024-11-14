const ProyectoService = require("../services/ProyectoService");
const proyectoService = new ProyectoService();

class ProyectoController {
  // Obtener todos los proyectos
  async getAll(req, res) {
    try {
      const proyectos = await proyectoService.findAll();
      res.status(200).json(proyectos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un proyecto por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const proyecto = await proyectoService.findOne(id);
      if (!proyecto) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
      }
      res.status(200).json(proyecto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo proyecto con integrantes
  async create(req, res) {
    try {
      const data = req.body;
      const newProyecto = await proyectoService.create(data);
      res.status(201).json({
        message: "Proyecto creado exitosamente",
        proyecto: newProyecto
      });
    } catch (error) {
      res.status(400).json({
        message: "Error al crear el proyecto",
        error: error.message
      });
    }
  }

  // Actualizar un proyecto existente con integrantes
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedProyecto = await proyectoService.update(id, data);
      res.status(200).json({
        message: "Proyecto actualizado exitosamente",
        proyecto: updatedProyecto
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el proyecto",
        error: error.message
      });
    }
  }

  // Eliminar un proyecto
  async delete(req, res) {
    try {
      const { id } = req.params;
      await proyectoService.delete(id);
      res.status(200).json({ message: "Proyecto eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProyectoController();
