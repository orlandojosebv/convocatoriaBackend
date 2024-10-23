module.exports = (sequelize, DataTypes, Model) => {
    class ProyectoIntegrante extends Model {
    }
  
    ProyectoIntegrante.init(
      {},
      {
        sequelize,
        modelName: 'Proyecto_integrante',
        tableName: 'proyecto_integrante',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      }
    );
  };