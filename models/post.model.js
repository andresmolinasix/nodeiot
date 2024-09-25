module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'post',
        freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
    });

    return Post;
};
