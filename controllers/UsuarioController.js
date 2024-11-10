const UsuarioService = require("../services/UsuarioService");

const usuarioService = new UsuarioService();

class UsuarioController {
  // Obtener todos los usuarios
  async getAll(req, res) {
    try {
      const usuarios = await usuarioService.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un usuario por ID
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.findOne(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo usuario
  async create(req, res) {
    try {
      const data = req.body;
      const newUsuario = await usuarioService.create(data);
      res.status(201).json(newUsuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Actualizar un usuario existente
  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedUsuario = await usuarioService.update(id, data);
      res.status(200).json(updatedUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Eliminar un usuario
  async delete(req, res) {
    try {
      const { id } = req.params;
      await usuarioService.delete(id);
      res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
