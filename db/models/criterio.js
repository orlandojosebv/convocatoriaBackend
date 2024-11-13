module.exports = (sequelize, DataTypes, Model) => {
  class Criterio extends Model {
    static associate(models) {
      this.belongsToMany(models.Calificacion, {
        through: models.Calificacion_Criterio,
        foreignKey: "id_criterio",
        otherKey: "id_calificacion",
        as: "Calificaciones",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Rubrica, {
        foreignKey: "id_rubrica",
        as: "Rubrica",
        onDelete: "CASCADE",
      });
    }
  }

  Criterio.init(
    {
      id_criterio: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valor_criterio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Criterio",
      tableName: "criterio",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
