const db = require("../db/index");
const models = db.sequelize.models;

class RubricaService {
  // Obtener todas las rúbricas con sus relaciones
  async findAll() {
    return await models.Rubrica.findAll({
      include: [
        { model: models.Criterio },           // Criterios de la rúbrica
        { model: models.CategoriaConvocatoria } // Categoría de la convocatoria a la que pertenece la rúbrica
      ],
    });
  }

  // Obtener una rúbrica por ID con sus relaciones
  async findOne(id) {
    const rubrica = await models.Rubrica.findByPk(id, {
      include: [
        { model: models.Criterio },
        { model: models.CategoriaConvocatoria }
      ],
    });
    if (!rubrica) throw new Error("Rúbrica no encontrada");
    return rubrica;
  }

  // Crear una nueva rúbrica
  async create(data) {
    return await models.Rubrica.create(data);
  }

  // Actualizar una rúbrica existente
  async update(id, data) {
    const rubrica = await this.findOne(id);
    return await rubrica.update(data);
  }

  // Eliminar una rúbrica
  async delete(id) {
    const rubrica = await this.findOne(id);
    await rubrica.destroy();
    return { deleted: true };
  }
}

module.exports = RubricaService;
