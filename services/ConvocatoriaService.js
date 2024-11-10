const db = require("../db/index");
const models = db.sequelize.models;

class ConvocatoriaService {
  // Obtener todas las convocatorias
  async findAll() {
    return await models.Convocatoria.findAll();
  }

  // Obtener una convocatoria por ID
  async findOne(id) {
    const convocatoria = await models.Convocatoria.findByPk(id);
    if (!convocatoria) throw new Error("Convocatoria no encontrada");
    return convocatoria;
  }

  // Crear una nueva convocatoria
  async create(data) {
    return await models.Convocatoria.create(data);
  }

  // Actualizar una convocatoria existente
  async update(id, data) {
    const convocatoria = await this.findOne(id);
    return await convocatoria.update(data);
  }

  // Eliminar una convocatoria
  async delete(id) {
    const convocatoria = await this.findOne(id);
    await convocatoria.destroy();
    return { deleted: true };
  }
}

module.exports = ConvocatoriaService;
