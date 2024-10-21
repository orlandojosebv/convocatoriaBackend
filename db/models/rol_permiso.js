module.exports = (sequelize, DataTypes, Model) => {
    class RolPermiso extends Model {
    }
  
    RolPermiso.init(
      {},
      {
        sequelize,
        modelName: 'Rol_Permiso',
        tableName: 'rol_permiso',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      }
    );
  };