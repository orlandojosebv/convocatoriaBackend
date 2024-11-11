module.exports = (sequelize, DataTypes, Model) => {
  class Rol extends Model {
    static associate(models) {
      this.belongsToMany(models.Permiso, {
        through: "Rol_Permiso",
        as: "Permisos", // Nombre de la relación
        onDelete: "CASCADE",
      });
      this.hasMany(models.Usuario, {
        foreignKey: "id_rol",
        as: "Usuarios", // Nombre de la relación
        onDelete: "RESTRICT",
      });
    }
  }

  Rol.init(
    {
      id_rol: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      nombre_rol: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "rol",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );

  return Rol;
};
