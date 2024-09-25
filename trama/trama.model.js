// trama.model.js
module.exports = (sequelize, DataTypes, nombreTrama) => {
    const NuevaTrama = sequelize.define(nombreTrama, {
        Tag: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        Unidades: {
            type: DataTypes.STRING(6),
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Host: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Puerto: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        Longitud: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
        Latitud: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: nombreTrama,
        freezeTableName: true
    });

    return NuevaTrama;
};
