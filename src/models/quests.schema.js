'use strict';

module.exports = (sqlDatabase, DataTypes) => {
    return sqlDatabase.define('quests', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        exp: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};