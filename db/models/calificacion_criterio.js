module.exports = (sequelize, DataTypes, Model) => {
    class CalificacionCriterio extends Model {
      static associate(models) {
      }
    }
  
    CalificacionCriterio.init(
      {
        puntaje_asignado: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Calificacion_Criterio",
        tableName: "calificacion_criterio",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
      }
    );
  };
  