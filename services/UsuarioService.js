const db = require("../db/index");
const models = db.sequelize.models;

class UsuarioService {
  // Obtener todos los usuarios con sus relaciones
  async findAll() {
    return await models.Usuario.findAll({
      include: [
        { model: models.Notificacion },  // Incluir notificaciones del usuario
        { model: models.Rol },           // Incluir el rol del usuario
      ],
    });
  }

  // Obtener un usuario por ID con sus relaciones
  async findOne(id) {
    const usuario = await models.Usuario.findByPk(id, {
      include: [
        { model: models.Notificacion },
        { model: models.Rol },
      ],
    });
    if (!usuario) throw new Error("Usuario no encontrado");
    return usuario;
  }

  // Crear un nuevo usuario
  async create(data) {
    return await models.Usuario.create(data);
  }

  // Actualizar un usuario existente
  async update(id, data) {
    const usuario = await this.findOne(id);
    return await usuario.update(data);
  }

  // Eliminar un usuario
  async delete(id) {
    const usuario = await this.findOne(id);
    await usuario.destroy();
    return { deleted: true };
  }
}

module.exports = UsuarioService;
