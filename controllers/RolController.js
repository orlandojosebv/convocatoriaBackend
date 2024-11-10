const RolService = require("../services/RolService");

const rolService = new RolService();

class RolController {
  // Obtener todos los roles
  async getAll(req, res) {
    try {
      const roles = await rolService.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un rol por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const rol = await rolService.findOne(id);
      if (!rol) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo rol
  async create(req, res) {
    try {
      const data = req.body;
      const newRol = await rolService.create(data);
      res.status(201).json(newRol);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un rol existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedRol = await rolService.update(id, data);
      res.status(200).json(updatedRol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un rol
  async delete(req, res) {
    try {
      const { id } = req.params;
      await rolService.delete(id);
      res.status(200).json({ message: "Rol eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RolController();
