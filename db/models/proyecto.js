module.exports = (sequelize, DataTypes, Model) => {
  class Proyecto extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: models.Proyecto_integrante,
        foreignKey: "id_proyecto",  // Especifica el nombre exacto de la columna
        otherKey: "id_usuario",     // Especifica la columna en Usuario
        as: "integrantes",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        as: "docente_asignado",
        onDelete: "RESTRICT",
      });
      this.hasMany(models.Calificacion, {
        foreignKey: "id_proyecto",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.CategoriaConvocatoria, {
        foreignKey: "id_categoria",
        onDelete: "RESTRICT",
      });
    }
  }

  Proyecto.init(
    {
      id_proyecto: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_inscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      calificacion_final: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Proyecto",
      tableName: "proyecto",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
