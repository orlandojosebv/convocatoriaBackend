// CategoriaConvocatoriaService.js
const db = require("../db/index");
const models = db.sequelize.models;

class CategoriaConvocatoriaService {
  // Obtener todas las categorías de convocatoria, incluyendo relaciones
  async findAll() {
    return await models.CategoriaConvocatoria.findAll({
      include: [
        {
          model: models.Rubrica,
          as: "Rubrica",
          attributes: ["id_rubrica", "nombre_rubrica"] // Selecciona solo los atributos de Rubricas que necesites
        }
      ],
    });
  }

  // Obtener una categoría de convocatoria por ID, incluyendo relaciones
  async findOne(id) {
    const categoria = await models.CategoriaConvocatoria.findByPk(id, {
      include: [
        {
          model: models.Rubrica,
          as: "Rubrica",
          attributes: ["id_rubrica", "nombre_rubrica"] // Selecciona solo los atributos de Rubricas que necesites
        }
      ],
    });
    if (!categoria) throw new Error("CategoriaConvocatoria no encontrada");
    return categoria;
  }

  // Crear una nueva categoría de convocatoria
  async create(data) {
    return await models.CategoriaConvocatoria.create(data);
  }

  // Actualizar una categoría de convocatoria existente
  async update(id, data) {
    const categoria = await this.findOne(id);
    return await categoria.update(data);
  }

  // Eliminar una categoría de convocatoria
  async delete(id) {
    const categoria = await this.findOne(id);
    await categoria.destroy();
    return { deleted: true };
  }
}

module.exports = CategoriaConvocatoriaService;
