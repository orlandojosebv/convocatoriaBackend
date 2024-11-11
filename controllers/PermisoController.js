const PermisoService = require("../services/PermisoService");
const permisoService = new PermisoService();

class PermisoController {
  // Obtener todos los permisos
  async getAll(req, res) {
    try {
      const permisos = await permisoService.findAll();
      res.status(200).json(permisos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un permiso por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const permiso = await permisoService.findOne(id);
      if (!permiso) {
        return res.status(404).json({ error: "Permiso no encontrado" });
      }
      res.status(200).json(permiso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo permiso
  async create(req, res) {
    try {
      const data = req.body;
      const newPermiso = await permisoService.create(data);
      res.status(201).json(newPermiso);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un permiso existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedPermiso = await permisoService.update(id, data);
      res.status(200).json(updatedPermiso);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un permiso
  async delete(req, res) {
    try {
      const { id } = req.params;
      await permisoService.delete(id);
      res.status(200).json({ message: "Permiso eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PermisoController();
