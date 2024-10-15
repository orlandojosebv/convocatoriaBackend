module.exports = (sequelize, DataTypes, Model) => {
    class Usuario extends Model {
      static associate(models) {
        this.hasMany(models.Notificacion,{foreignKey:"id_usuario"});
      }
    }
  
    Usuario.init(
      {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
          },
        correo: {
          type: DataTypes.STRING,
          unique: true
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false
        },
        apellido: {
          type: DataTypes.STRING,
          allowNull: false
        },
        contrasena: {
          type: DataTypes.STRING,
          allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          }
      },
      {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuario',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      }
    );
  };