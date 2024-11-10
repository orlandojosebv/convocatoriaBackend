const db = require("../db/index");
const models = db.sequelize.models;

class ProyectoService {
  // Obtener todos los proyectos con sus relaciones
  async findAll() {
    return await models.Proyecto.findAll({
      include: [
        { model: models.Usuario, as: "docente_asignado" }, // Docente asignado
        { model: models.Usuario, through: "proyecto_integrante" }, // Integrantes del proyecto
        { model: models.CategoriaConvocatoria } // Categoría de la convocatoria
      ],
    });
  }

  // Obtener un proyecto por ID con sus relaciones
  async findOne(id) {
    const proyecto = await models.Proyecto.findByPk(id, {
      include: [
        { model: models.Usuario, as: "docente_asignado" },
        { model: models.Usuario, through: "proyecto_integrante" },
        { model: models.CategoriaConvocatoria }
      ],
    });
    if (!proyecto) throw new Error("Proyecto no encontrado");
    return proyecto;
  }

  // Crear un nuevo proyecto
  async create(data) {
    return await models.Proyecto.create(data);
  }

  // Actualizar un proyecto existente
  async update(id, data) {
    const proyecto = await this.findOne(id);
    return await proyecto.update(data);
  }

  // Eliminar un proyecto
  async delete(id) {
    const proyecto = await this.findOne(id);
    await proyecto.destroy();
    return { deleted: true };
  }
}

module.exports = ProyectoService;
