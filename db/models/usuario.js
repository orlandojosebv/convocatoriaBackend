module.exports = (sequelize, DataTypes, Model) => {
  class Usuario extends Model {
    static associate(models) {
      this.hasMany(models.Notificacion, {
        foreignKey: "id_usuario",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Rol, {
        foreignKey: "id_rol",
        onDelete: "RESTRICT",
      });
      this.hasMany(models.Proyecto, {
        foreignKey: "id_usuario",
        onDelete: "RESTRICT",
      });
      this.belongsToMany(models.Proyecto, {
        through: "proyecto_integrante",
        foreignKey: "id_usuario",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Calificacion, {
        foreignKey: "id_usuario",
        onDelete: "RESTRICT",
      });
    }
  }

  Usuario.init(
    {
      id_usuario: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuario",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
