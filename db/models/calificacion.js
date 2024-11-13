module.exports = (sequelize, DataTypes, Model) => {
  class Calificacion extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        onDelete: "RESTRICT",
      });
      this.belongsTo(models.Proyecto, {
        foreignKey: "id_proyecto",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.Criterio, {
        through: models.Calificacion_Criterio,
        foreignKey: "id_calificacion",
        otherKey: "id_criterio",
        as: "Criterios",
        onDelete: "CASCADE",
      });
    }
  }

  Calificacion.init(
    {
      id_calificacion: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      puntaje_final: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Calificacion",
      tableName: "calificacion",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
