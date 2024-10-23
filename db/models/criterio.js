module.exports = (sequelize, DataTypes, Model) => {
    class Criterio extends Model {
      static associate(models) {
        this.belongsToMany(models.Calificacion, {
          through: "calificacion_criterio",
          foreignKey: "id_criterio",
          onDelete: "CASCADE",
          primaryKey: true,
        });
        this.belongsTo(models.Rubrica, {
          foreignKey: 'id_rubrica',
          onDelete: "CASCADE",
        });
      }
    }
  
    Criterio.init(
      {
        id_criterio: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        descripcion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        valor_criterio: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Criterio",
        tableName: "criterio",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
      }
    );
  };
  