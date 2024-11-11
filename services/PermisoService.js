const db = require("../db/index");
const models = db.sequelize.models;

class PermisoService {
  // Obtener todos los permisos con los roles asociados
  async findAll() {
    return await models.Permiso.findAll({
      include: [
        { model: models.Rol, as: "Rols", through: "Rol_Permiso" } // Incluye los roles asociados al permiso
      ],
    });
  }

  // Obtener un permiso por ID con los roles asociados
  async findOne(id) {
    return await models.Permiso.findByPk(id, {
      include: [
        { model: models.Rol, as: "Rols", through: "Rol_Permiso" } // Incluye los roles asociados
      ],
    });
  }

  // Crear un nuevo permiso
  async create(data) {
    return await models.Permiso.create(data);
  }

  // Actualizar un permiso existente
  async update(id, data) {
    const permiso = await this.findOne(id);
    return await permiso.update(data);
  }

  // Eliminar un permiso
  async delete(id) {
    const permiso = await this.findOne(id);
    await permiso.destroy();
    return { deleted: true };
  }
}

module.exports = PermisoService;
