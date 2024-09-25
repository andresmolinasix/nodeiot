module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define('Auth', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        
        password: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'auth', // Deshabilita la pluralización
        timestamps: false  // Si no necesitas `createdAt` y `updatedAt`
    });

    return Auth;
};
