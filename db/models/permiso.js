module.exports = (sequelize, DataTypes, Model) => {
  class Permiso extends Model {
    static associate(models) {
      this.belongsToMany(models.Rol, {
        through: "Rol_Permiso",
        as: "Rols", // Alias para la relación inversa con Rol
        onDelete: "CASCADE",
      });
    }
  }

  Permiso.init(
    {
      id_permiso: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre_permiso: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Permiso",
      tableName: "permiso",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
