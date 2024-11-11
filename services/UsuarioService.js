const db = require("../db/index");
const models = db.sequelize.models;

class UsuarioService {
  // Obtener todos los usuarios con sus roles y notificaciones
  async findAll() {
    return await models.Usuario.findAll({
      include: [
        { model: models.Notificacion },  // Incluye notificaciones del usuario
        { model: models.Rol },           // Incluye el rol del usuario
      ],
    });
  }

  // Obtener un usuario por ID con sus roles y notificaciones
  async findOne(id) {
    return await models.Usuario.findByPk(id, {
      include: [
        { model: models.Notificacion },
        { model: models.Rol },
      ],
    });
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
