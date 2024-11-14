const db = require("../db/index");
const models = db.sequelize.models;

class PermisoService {
  // Obtener todos los permisos con los roles asociados
  async findAll() {
    return await models.Permiso.findAll({
      attributes: ["id_permiso", "nombre_permiso"], // Selecciona solo los atributos necesarios para Permiso
      include: [
        {
          model: models.Rol,
          as: "Rols", // Utiliza el alias correctamente definido
          attributes: ["id_rol", "nombre_rol"], // Selecciona solo los atributos necesarios para Rol
          through: { attributes: [] } // Excluye completamente la tabla intermedia
        }
      ],
    });
  }

  // Obtener un permiso por ID con los roles asociados
  async findOne(id) {
    return await models.Permiso.findByPk(id, {
      attributes: ["id_permiso", "nombre_permiso"],
      include: [
        {
          model: models.Rol,
          as: "Rols",
          attributes: ["id_rol", "nombre_rol"],
          through: { attributes: [] }
        }
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
