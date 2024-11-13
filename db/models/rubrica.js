module.exports = (sequelize, DataTypes, Model) => {
    class Rubrica extends Model {
      static associate(models) {
        //Relacion con idconvocatoria y con id_categoria
        this.hasMany(models.Criterio, {
          foreignKey: "id_rubrica",
          as:"Criterios",
          onDelete: "CASCADE",
        });
        this.belongsTo(models.CategoriaConvocatoria, {
          foreignKey: "id_categoria",
          as: "CategoriaConvocatoria",
          onDelete: "RESTRICT",
        });
      }
    }
  
    Rubrica.init(
      {
        id_rubrica: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        nombre_rubrica: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Rubrica",
        tableName: "rubrica",
        freezeTableName: true,
        createdAt: false,
        updatedAt: false,
      }
    );
  };
  