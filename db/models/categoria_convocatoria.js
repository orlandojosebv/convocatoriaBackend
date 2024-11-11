// CategoriaConvocatoria.js
module.exports = (sequelize, DataTypes, Model) => {
  class CategoriaConvocatoria extends Model {
    static associate(models) {
      this.belongsTo(models.Convocatoria, {
        foreignKey: "id_convocatoria",
        as: "Convocatoria",  // Especifica un alias aquí
        onDelete: "RESTRICT",
      });
      this.hasMany(models.Rubrica, {
        foreignKey: "id_categoria",
        as: "Rubricas",
        onDelete: "RESTRICT",
      });
      this.hasMany(models.Proyecto, {
        foreignKey: "id_categoria",
        as: "Proyectos",
        onDelete: "RESTRICT",
      });
    }
  }

  CategoriaConvocatoria.init(
    {
      id_categoria: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nombre_categoria: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "CategoriaConvocatoria",
      tableName: "categoria_convocatoria",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );

  return CategoriaConvocatoria;
};
