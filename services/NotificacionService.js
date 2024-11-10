const db = require("../db/index");
const models = db.sequelize.models;

class NotificacionService {
  // Obtener todas las notificaciones con sus relaciones
  async findAll() {
    return await models.Notificacion.findAll({
      include: [
        { model: models.Usuario } // Usuario al que pertenece la notificación
      ],
    });
  }

  // Obtener una notificación por ID con su relación
  async findOne(id) {
    const notificacion = await models.Notificacion.findByPk(id, {
      include: [
        { model: models.Usuario }
      ],
    });
    if (!notificacion) throw new Error("Notificación no encontrada");
    return notificacion;
  }

  // Crear una nueva notificación
  async create(data) {
    return await models.Notificacion.create(data);
  }

  // Actualizar una notificación existente
  async update(id, data) {
    const notificacion = await this.findOne(id);
    return await notificacion.update(data);
  }

  // Eliminar una notificación
  async delete(id) {
    const notificacion = await this.findOne(id);
    await notificacion.destroy();
    return { deleted: true };
  }
}

module.exports = NotificacionService;
