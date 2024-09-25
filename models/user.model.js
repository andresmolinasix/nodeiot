module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        
    }, {
        timestamps: false,
        tableName: 'user',
        freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
    });

    return User;
};
