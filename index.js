'use strict';

const { sqlDatabase } = require('./src/models/index');
const { start } = require('./src/server');

sqlDatabase.sync()
    .then( () => {
        console.log('It worked!');
        start();
    })
    .catch( e => console.error(e));