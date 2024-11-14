const UsuarioService = require("../services/UsuarioService");
const usuarioService = new UsuarioService();

class UsuarioController {
  // Obtener todos los usuarios con el nombre de su rol
  async getAll(req, res) {
    try {
      const usuarios = await usuarioService.findAll();
      const usuariosConRol = usuarios.map((usuario) => {
        const { Rol, ...usuarioSinRol } = usuario.toJSON();
        return {
          ...usuarioSinRol,
          id_rol: Rol ? Rol.id_rol : null,
          nombre_rol: Rol ? Rol.nombre_rol : null
        };
      });
      res.status(200).json(usuariosConRol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Obtener un usuario por ID con el nombre de su rol
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.findOne(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      const { Rol, ...usuarioSinRol } = usuario.toJSON();
      res.status(200).json({
        ...usuarioSinRol,
        id_rol: Rol ? Rol.id_rol : null,
        nombre_rol: Rol ? Rol.nombre_rol : null
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Crear un nuevo usuario con mensaje de éxito
  async create(req, res) {
    try {
      const data = req.body;
      const newUsuario = await usuarioService.create(data);
      res.status(201).json({
        success: true,
        message: "Usuario creado exitosamente",
        usuario: newUsuario
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error al crear el usuario",
        error: error.message
      });
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
