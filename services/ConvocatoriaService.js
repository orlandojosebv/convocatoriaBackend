const db = require("../db/index");
const models = db.sequelize.models;

class ConvocatoriaService {
  // Obtener todas las convocatorias con categorías asociadas
  async findAll() {
    return await models.Convocatoria.findAll({
      include: [
        {
          model: models.CategoriaConvocatoria,
          attributes: ["id_categoria", "nombre_categoria"], // Selecciona el id y el nombre de la categoría
        }
      ]
    });
  }

  // Obtener una convocatoria por ID con categorías asociadas
  async findOne(id) {
    const convocatoria = await models.Convocatoria.findByPk(id, {
      include: [
        {
          model: models.CategoriaConvocatoria,
          attributes: ["id_categoria", "nombre_categoria"],
        }
      ]
    });
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
      categorias,
    } = data;

    const newConvocatoria = await models.Convocatoria.create({
      id_convocatoria: data.id_convocatoria,
      nombre_convocatoria,
      fecha_inicio_inscripcion,
      fecha_cierre_inscripcion,
      fecha_limite_calificacion,
      fecha_inicio_convocatoria,
      fecha_cierre_convocatoria,
    });

    if (categorias && categorias.length > 0) {
      const existingCategorias = await models.CategoriaConvocatoria.findAll({
        where: { id_categoria: categorias },
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
