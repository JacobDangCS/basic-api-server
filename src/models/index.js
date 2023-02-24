'use strict';

// Whiteboard differs from code
//Implement RPG Schema

require('dotenv').config();
const { Sequelize, DataTypes } = require ('sequelize');
const ModelInterface = require ('./modelInterface');
const playerSchema = require('./players.schema');
const questSchema = require('./quests.schema')

//'postgres://localhost:5432/basic-api-server' post in URL for testing
//Ternary is used to set up sqlite for testing
const DATABASE_URL = process.env.NODE_ENV === 'test'
    ? 'sqlite::memory'
    : process.env.DATABASE_URL;


//Instantitate the sequelized connection to the database

const sqlDatabase = new Sequelize(DATABASE_URL, {
    dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const PlayerModel = playerSchema(sqlDatabase, DataTypes);
const QuestModel = questSchema(sqlDatabase, DataTypes);

//relations between players and quests
PlayerModel.hasMany(QuestModel);
QuestModel.belongsTo(PlayerModel);

module.exports = {
    sqlDatabase,
    PlayerModel,
    playerInterface: new ModelInterface(PlayerModel),
    questInterface: new ModelInterface(QuestModel),
};