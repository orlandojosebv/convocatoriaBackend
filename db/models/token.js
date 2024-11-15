module.exports = (sequelize, DataTypes, Model) => {
    class Token extends Model {
        static associate(models) {
            this.belongsTo(models.Usuario, {
                foreignKey: {
                    type: DataTypes.STRING(256),
                    name: "id_usuario",
                },
                onDelete: "CASCADE",
            });
        }
    }

    Token.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fechaExpiracion: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "Token",
            tableName: "token",
            freezeTableName: true,
            createdAt: false,
            updatedAt: false
        },
    );
};