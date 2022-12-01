'use strict';

module.exports = (sqlDatabase, DataTypes) => {
    return sqlDatabase.define('players', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        class: {
            type: DataTypes.ENUM,
            values: ['knight', 'mage', 'ninja'],
            allowNull: true,
        },
    });
};