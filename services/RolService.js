const db = require("../db/index");
const models = db.sequelize.models;

class RolService {
  // Obtener todos los roles con solo los permisos
  async findAll() {
    return await models.Rol.findAll({
      attributes: ["id_rol", "nombre_rol"],
      include: [
        { 
          model: models.Permiso,
          as: "Permisos",
          through: { attributes: [] } // Excluir atributos de la tabla intermedia
        }
      ],
    });
  }

  // Obtener un rol por ID con solo permisos
  async findOne(id) {
    return await models.Rol.findByPk(id, {
      attributes: ["id_rol", "nombre_rol"],
      include: [
        { 
          model: models.Permiso,
          as: "Permisos",
          through: { attributes: [] } // Excluir atributos de la tabla intermedia
        }
      ],
    });
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

  // Asignar permisos a un rol específico
  async assignPermissions(id, permissionIds) { 
    const rol = await models.Rol.findByPk(id);
    if (!rol) throw new Error("Rol no encontrado");

    const permisos = await models.Permiso.findAll({
      where: { id_permiso: permissionIds }
    });

    if (permisos.length === 0) throw new Error("Permisos no encontrados");

    await rol.addPermisos(permisos);
    return rol;
  }
}

module.exports = RolService;
