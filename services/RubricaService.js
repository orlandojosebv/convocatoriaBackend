const db = require("../db/index");
const models = db.sequelize.models;

class RubricaService {
  // Obtener todas las rúbricas con sus relaciones
  async findAll() {
    return await models.Rubrica.findAll({
      attributes: ["id_rubrica", "nombre_rubrica", "id_categoria"],
      include: [
        { 
          model: models.Criterio,
          as: "Criterios",
          attributes: ["id_criterio", "descripcion"] // Ajusta los atributos necesarios de Criterio
        },
        { 
          model: models.CategoriaConvocatoria,
          as: "CategoriaConvocatoria", // Alias correcto
          attributes: ["nombre_categoria"] // Solo nombre_categoria
        }
      ],
    });
  }

  // Obtener una rúbrica por ID con sus relaciones
  async findOne(id) {
    return await models.Rubrica.findByPk(id, {
      attributes: ["id_rubrica", "nombre_rubrica", "id_categoria"],
      include: [
        { 
          model: models.Criterio,
          as: "Criterios",
          attributes: ["id_criterio", "descripcion"]
        },
        { 
          model: models.CategoriaConvocatoria,
          as: "CategoriaConvocatoria",
          attributes: ["nombre_categoria"]
        }
      ],
    });
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
