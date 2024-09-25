// data.model.js
module.exports = (sequelize, DataTypes) => {
    const Data = sequelize.define('Data', {
        tag: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        Moment: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        State: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        insertion_timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 'data',
        freezeTableName: true,
    });

    return Data;
};
