const db = require("../db/index");
const models = db.sequelize.models;

class CriterioService {
  // Obtener todos los criterios con sus relaciones
  async findAll() {
    return await models.Criterio.findAll({
      include: [
        { model: models.Rubrica }, // Rúbrica a la que pertenece el criterio
        { model: models.Calificacion, through: "calificacion_criterio" } // Calificaciones asociadas al criterio
      ],
    });
  }

  // Obtener un criterio por ID con sus relaciones
  async findOne(id) {
    const criterio = await models.Criterio.findByPk(id, {
      include: [
        { model: models.Rubrica },
        { model: models.Calificacion, through: "calificacion_criterio" }
      ],
    });
    if (!criterio) throw new Error("Criterio no encontrado");
    return criterio;
  }

  // Crear un nuevo criterio
  async create(data) {
    return await models.Criterio.create(data);
  }

  // Actualizar un criterio existente
  async update(id, data) {
    const criterio = await this.findOne(id);
    return await criterio.update(data);
  }

  // Eliminar un criterio
  async delete(id) {
    const criterio = await this.findOne(id);
    await criterio.destroy();
    return { deleted: true };
  }
}

module.exports = CriterioService;
