// Importación de la instancia de base de datos y los modelos definidos
const db = require("../db/index");
const models = db.sequelize.models;

class CriterioService {
  // Método para obtener todos los criterios, junto con sus relaciones
  async findAll() {
    return await models.Criterio.findAll({
      include: [
        {
          model: models.Calificacion, // Asociación con el modelo Calificacion
          as: "Calificaciones", // Alias usado en el modelo para la relación
          through: {
            model: models.Calificacion_Criterio, // Tabla intermedia que conecta Criterio y Calificacion
            attributes: ["puntaje_asignado"], // Atributo específico de la tabla intermedia a incluir
          },
          attributes: ["id_calificacion", "puntaje_final", "observacion"], // Atributos de Calificacion que se incluirán en la consulta
        },
        {
          model: models.Rubrica, // Asociación con el modelo Rubrica
          as: "Rubrica", // Alias de la relación en el modelo
          attributes: ["nombre_rubrica"], // Solo incluye el nombre de la rúbrica en el resultado
        },
      ],
    });
  }

  // Método para obtener un criterio específico por su ID, incluyendo sus relaciones
  async findOne(id) {
    return await models.Criterio.findByPk(id, {
      include: [
        {
          model: models.Calificacion,
          as: "Calificaciones",
          through: {
            model: models.Calificacion_Criterio,
            attributes: ["puntaje_asignado"],
          },
          attributes: ["id_calificacion", "puntaje_final", "observacion"],
        },
        {
          model: models.Rubrica,
          as: "Rubrica",
          attributes: ["nombre_rubrica"],
        },
      ],
    });
  }

  // Método para crear un nuevo criterio en la base de datos
  async create(data) {
    return await models.Criterio.create(data);
  }

  // Método para actualizar un criterio existente identificado por su ID
  async update(id, data) {
    const criterio = await this.findOne(id); // Encuentra el criterio por su ID
    return await criterio.update(data); // Actualiza el criterio con los nuevos datos
  }

  // Método para eliminar un criterio existente por su ID
  async delete(id) {
    const criterio = await this.findOne(id); // Encuentra el criterio por su ID
    await criterio.destroy(); // Elimina el criterio de la base de datos
    return { deleted: true }; // Retorna una confirmación de eliminación
  }
}

module.exports = CriterioService;
