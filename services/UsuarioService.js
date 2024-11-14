const db = require("../db/index");
const models = db.sequelize.models;

class UsuarioService {
  // Obtener todos los usuarios con los campos solicitados y el rol
  async findAll() {
    return await models.Usuario.findAll({
      attributes: ["id_usuario", "correo", "estado"], // Solo los campos necesarios
      include: [
        {
          model: models.Rol,
          attributes: ["id_rol", "nombre_rol"] // Incluye solo el id y nombre del rol
        }
      ],
    });
  }

  // Obtener un usuario por ID con los campos solicitados y el rol
  async findOne(id) {
    return await models.Usuario.findByPk(id, {
      attributes: ["id_usuario", "correo", "estado"], // Solo los campos necesarios
      include: [
        {
          model: models.Rol,
          attributes: ["id_rol", "nombre_rol"] // Incluye solo el id y nombre del rol
        }
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
