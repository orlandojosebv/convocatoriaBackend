const db = require("../db/index");
const models = db.sequelize.models;

class RolService {
  // Obtener todos los roles con sus relaciones
  async findAll() {
    return await models.Rol.findAll({
      include: [
        { model: models.Usuario }, // Usuarios asociados al rol
        { model: models.Permiso, through: "rol_permiso" } // Permisos asociados al rol
      ],
    });
  }

  // Obtener un rol por ID con sus relaciones
  async findOne(id) {
    const rol = await models.Rol.findByPk(id, {
      include: [
        { model: models.Usuario },
        { model: models.Permiso, through: "rol_permiso" }
      ],
    });
    if (!rol) throw new Error("Rol no encontrado");
    return rol;
  }

  // Crear un nuevo rol
  async create(data) {
    return await models.Rol.create(data);
  }

  // Actualizar un rol existente
  async update(id, data) {
    const rol = await this.findOne(id);
    return await rol.update(data);
  }

  // Eliminar un rol
  async delete(id) {
    const rol = await this.findOne(id);
    await rol.destroy();
    return { deleted: true };
  }
}

module.exports = RolService;
