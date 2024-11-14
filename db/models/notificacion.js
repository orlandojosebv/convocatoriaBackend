module.exports = (sequelize, DataTypes, Model) => {
  class Notificacion extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
        onDelete: "CASCADE",
      });
    }
  }

  Notificacion.init(
    {
      id_notificacion: {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true,
      },
      mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_envio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Notificacion",
      tableName: "notificacion",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
};
