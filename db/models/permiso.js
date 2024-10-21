module.exports = (sequelize, DataTypes, Model) => {
    class Permiso extends Model {
      static associate(models) {
        this.belongsToMany(models.Rol,{through:"Rol_Permiso"});
      }
    }
  
    Permiso.init(
      {
        id_permiso: {
            type: DataTypes.STRING,
            primaryKey: true
          },
        nombre_permiso: {
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        sequelize,
        modelName: 'Permiso',
        tableName: 'permiso',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      }
    );
  };