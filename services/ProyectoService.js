const db = require("../db/index");
const models = db.sequelize.models;

class ProyectoService {
  // Obtener todos los proyectos con sus relaciones
  async findAll() {
    return await models.Proyecto.findAll({
      attributes: [
        "id_proyecto",
        "titulo",
        "descripcion",
        "estado",
        "fecha_inscripcion",
        "calificacion_final",
      ], // Excluye `id_usuario` ya que lo obtenemos con el docente asignado
      include: [
        {
          model: models.Usuario,
          as: "docente_asignado",
          attributes: ["id_usuario", "nombre", "apellido", "correo"], // Incluye correo del docente
        },
        {
          model: models.Usuario,
          as: "integrantes",
          through: { attributes: [] },
          attributes: ["id_usuario", "nombre", "apellido", "correo"], // Incluye correo de los integrantes
        },
        {
          model: models.CategoriaConvocatoria,
          attributes: ["id_categoria", "nombre_categoria"],
        },
      ],
    });
  }

  // Obtener un proyecto por ID con sus relaciones
  async findOne(id) {
    const proyecto = await models.Proyecto.findByPk(id, {
      attributes: [
        "id_proyecto",
        "titulo",
        "descripcion",
        "estado",
        "fecha_inscripcion",
        "calificacion_final",
      ], // Excluye `id_usuario` principal
      include: [
        {
          model: models.Usuario,
          as: "docente_asignado",
          attributes: ["id_usuario", "nombre", "apellido", "correo"], // Incluye correo del docente
        },
        {
          model: models.Usuario,
          as: "integrantes",
          through: { attributes: [] },
          attributes: ["id_usuario", "nombre", "apellido", "correo"], // Incluye correo de los integrantes
        },
        {
          model: models.CategoriaConvocatoria,
          attributes: ["id_categoria", "nombre_categoria"],
        },
      ],
    });
    if (!proyecto) throw new Error("Proyecto no encontrado");
    return proyecto;
  }

  // Crear un nuevo proyecto con integrantes
  async create(data) {
    const { integrantes, ...proyectoData } = data; // Extrae integrantes del resto de los datos
    const newProyecto = await models.Proyecto.create(proyectoData);

    // Asignar integrantes al proyecto si existen
    if (integrantes && integrantes.length > 0) {
      const usuarios = await models.Usuario.findAll({
        where: { id_usuario: integrantes },
      });
      await newProyecto.addIntegrantes(usuarios);
    }

    return this.findOne(newProyecto.id_proyecto); // Retorna el proyecto con sus relaciones
  }

  // Actualizar un proyecto existente con integrantes
  async update(id, data) {
    const { integrantes, ...proyectoData } = data;
    const proyecto = await this.findOne(id);
    await proyecto.update(proyectoData);

    // Actualizar los integrantes si se proporcionan
    if (integrantes && integrantes.length > 0) {
      const usuarios = await models.Usuario.findAll({
        where: { id_usuario: integrantes },
      });
      await proyecto.setIntegrantes(usuarios); // Reemplaza los integrantes existentes
    }

    return this.findOne(id); // Retorna el proyecto actualizado con sus relaciones
  }

  // Eliminar un proyecto
  async delete(id) {
    const proyecto = await this.findOne(id);
    await proyecto.destroy();
    return { deleted: true };
  }
}

module.exports = ProyectoService;
