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
    const {
      nombre_convocatoria,
      fecha_inicio_inscripcion,
      fecha_cierre_inscripcion,
      fecha_limite_calificacion,
      fecha_inicio_convocatoria,
      fecha_cierre_convocatoria,
      categorias, // Recibe un array con los IDs de categorías existentes
    } = data;

    // Crear una nueva convocatoria y asociar categorías existentes
    const newConvocatoria = await models.Convocatoria.create({
      id_convocatoria: data.id_convocatoria, // Puede ser manual o generado
      nombre_convocatoria,
      fecha_inicio_inscripcion,
      fecha_cierre_inscripcion,
      fecha_limite_calificacion,
      fecha_inicio_convocatoria,
      fecha_cierre_convocatoria,
    });

    // Asociar categorías existentes a la convocatoria
    if (categorias && categorias.length > 0) {
      const existingCategorias = await models.CategoriaConvocatoria.findAll({
        where: { id_categoria: categorias }, // Busca las categorías por ID
      });
      for (const categoria of existingCategorias) {
        await categoria.update({
          id_convocatoria: newConvocatoria.id_convocatoria,
        });
      }
    }

    return newConvocatoria;
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
