const db = require("../db/index");
const models = db.sequelize.models;

class CalificacionService {
  // Obtener todas las calificaciones con sus relaciones
  async findAll() {
    return await models.Calificacion.findAll({
      include: [
        { model: models.Usuario },  // Usuario que realizó la calificación
        { model: models.Proyecto }, // Proyecto al que pertenece la calificación
        { model: models.Criterio, through: "calificacion_criterio" } // Criterios de la calificación
      ],
    });
  }

  // Obtener una calificación por ID con sus relaciones
  async findOne(id) {
    const calificacion = await models.Calificacion.findByPk(id, {
      include: [
        { model: models.Usuario },
        { model: models.Proyecto },
        { model: models.Criterio, through: "calificacion_criterio" }
      ],
    });
    if (!calificacion) throw new Error("Calificación no encontrada");
    return calificacion;
  }

  // Crear una nueva calificación
  async create(data) {
    return await models.Calificacion.create(data);
  }

  // Actualizar una calificación existente
  async update(id, data) {
    const calificacion = await this.findOne(id);
    return await calificacion.update(data);
  }

  // Eliminar una calificación
  async delete(id) {
    const calificacion = await this.findOne(id);
    await calificacion.destroy();
    return { deleted: true };
  }
}

module.exports = CalificacionService;
