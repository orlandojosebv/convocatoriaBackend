module.exports = (sequelize, DataTypes, Model) => {
    class Convocatoria extends Model {
      static associate(models) {
      }
    }
  
    Convocatoria.init(
      {
        id_convocatoria: {
            type: DataTypes.STRING,
            primaryKey: true
          },
        nombre_convocatoria: {
          type: DataTypes.STRING,
          allowNull:false
        },
        fecha_inicio_inscripcion: {
          type: DataTypes.DATE,
          allowNull: false
        },
        fecha_cierre_inscripcion: {
          type: DataTypes.DATE,
          allowNull: false
        },
        fecha_limite_calificacion: {
          type: DataTypes.DATE,
          allowNull: false
        },
        fecha_inicio_convocatoria: {
            type: DataTypes.DATE,
            allowNull: false
          },
          fecha_cierre_convocatoria: {
            type: DataTypes.DATE,
            allowNull: false
          }
      },
      {
        sequelize,
        modelName: 'Convocatoria',
        tableName: 'convocatoria',
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      }
    );
  };